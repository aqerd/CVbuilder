from flask import Flask
from flask_mail import Mail
from flask_wtf import CSRFProtect
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
mail = Mail(app)    
csrf = CSRFProtect(app)

from app import routes
