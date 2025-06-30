from flask import Flask
from flask_mail import Mail
from flask_wtf import CSRFProtect

from app.routes import router
from settings import Settings

site = Flask(__name__)
site.config.from_object(Settings)
mail = Mail(site)
csrf = CSRFProtect(site)
site.register_blueprint(router)
site.logger.setLevel(Settings.LOG_LEVEL)
