from flask import Flask
from flask_mail import Mail
from flask_wtf import CSRFProtect
from settings import Settings
import logging

app = Flask(__name__)
app.config.from_object(Settings)
mail = Mail(app)
csrf = CSRFProtect(app)
app.logger.setLevel(logging.DEBUG)

from app import routes
