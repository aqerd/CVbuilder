import mimetypes
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
                    msg.attach(attachment, mime_type, f.read())
        mail.send(msg)
        
def send_cv_mail(recipient, name, cv_path):
    send_mail(
        subject='Ваше резюме',
        recipients=[recipient],
        text_body=render_template('cv_email.txt', name=name),
        attachments=[cv_path]
    )