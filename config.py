import os
from os import getenv

class Config:
    SECRET_KEY = os.urandom(36)
    MAIL_SERVER = 'smtp.mail.ru'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'cv_builder@mail.ru'
    MAIL_PASSWORD = getenv('MAIL_PASSWORD')
    MAIL_DEFAULT_SENDER = ('CVbuilder','cv_builder@mail.ru')
