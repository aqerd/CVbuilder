"""\file email_utils.py
\brief Send emails in the CVbuilder application.

\details Provides helpers to send general and CV-related emails via
Flask-Mail.


\version 0.1
\copyright MIT License
"""

import mimetypes
import os
import shutil

from flask import render_template
from flask_mail import Message
from settings import Settings


def send_mail(subject: str, sender: str, recipients: list[str], body: str,
              html_body: str | None = None, attachments: list[str] | None = None, mail=None) -> None:
    """\brief Send an email using Flask-Mail.

    \details Creates a :pyclass:`flask_mail.Message`, attaches optional files
    and sends it using the provided *mail* instance.

    \param subject Subject line.
    \param sender Sender address.
    \param recipients List of recipient addresses.
    \param body Plain-text body.
    \param html_body Optional HTML body.
    \param attachments Optional list of file paths.
    \param mail Configured Flask-Mail instance.
    \exception Exception If sending fails.
    """
    with mail.app_context():
        msg = Message(subject=subject, recipients=recipients)
        msg.body = text_body
        if attachments:
            for attachment in attachments:
                mime_type, _ = mimetypes.guess_type(attachment)
                with open(attachment, "rb") as f:
                    msg.attach(os.path.basename(attachment), mime_type, f.read())
        mail.send(msg)


def send_cv_mail(recipient: str, name: str, lastname: str, cv_path: str, mail=None) -> None:
    """\brief Send the generated CV to a recipient.

    \details Temporarily copies the CV file, renames it with user's
    *name* and *lastname*, sends it as attachment and removes the temporary
    file afterwards.

    \param recipient Destination email.
    \param name User first name.
    \param lastname User last name.
    \param cv_path Path to the CV file.
    \param mail Flask-Mail instance.
    \exception Exception If sending fails or file handling error occurs.
    """
    original_filename = os.path.basename(cv_path)
    new_filename = f"{name}_{lastname}_{original_filename}"
    new_path = os.path.join(os.path.dirname(cv_path), new_filename)
    shutil.copy(cv_path, new_path)

    try:
        send_mail(
            subject="Your CV",
            recipients=[recipient],
            text_body=render_template(
                Settings.EMAIL_TEMPLATE_FILE_PATH,
                name=name,
                lastname=lastname,
            ),
            attachments=[new_path],
            mail=mail,
        )
    finally:
        os.remove(new_path)
