from flask import Flask
from flask_mail import Mail
from config import Config
import os

app = Flask(__name__)
app.config.from_object(Config)
app.secret_key = os.urandom(24)
mail = Mail(app)

from app import routes