import mimetypes
import os
import shutil
from app import app, mail
from flask_mail import Message
from flask import render_template

def send_mail(subject, recipients, text_body, attachments=None):
    with app.app_context():
        msg = Message(subject=subject, recipients=recipients)
        msg.body = text_body
        if attachments:
            for attachment in attachments:
                mime_type, _ = mimetypes.guess_type(attachment)
                with app.open_resource(attachment) as f:
                    msg.attach(os.path.basename(attachment), mime_type, f.read())
        mail.send(msg)


def send_cv_mail(recipient, name, lastname, cv_path):
    original_filename = os.path.basename(cv_path)
    new_filename = f"{name}_{lastname}_{original_filename}"
    new_path = os.path.join(os.path.dirname(cv_path), new_filename)
    shutil.copy(cv_path, new_path)

    try:
        send_mail(
            subject='Your CV',
            recipients=[recipient],
            text_body=render_template('shared/cv_email.txt', name=name, lastname=lastname),
            attachments=[new_path]
        )
    finally:
        os.remove(new_path)
