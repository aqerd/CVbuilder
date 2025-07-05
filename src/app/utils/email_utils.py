import mimetypes
import os
import shutil

from flask import render_template
from flask_mail import Message
from settings import Settings

def send_mail(subject, recipients, text_body, attachments=None, mail=None):
    with mail.app_context():
        msg = Message(subject=subject, recipients=recipients)
        msg.body = text_body
        if attachments:
            for attachment in attachments:
                mime_type, _ = mimetypes.guess_type(attachment)
                with open(attachment, "rb") as f:
                    msg.attach(os.path.basename(attachment), mime_type, f.read())
        mail.send(msg)


def send_cv_mail(recipient, name, lastname, cv_path, mail):
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
