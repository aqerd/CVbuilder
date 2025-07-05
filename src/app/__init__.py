from flask import Flask
from flask_mail import Mail
from flask_wtf import CSRFProtect

from app.routes import page_not_found, router
from settings import Settings

site = Flask(__name__)
site.config.from_object(Settings)
mail = Mail(site)
csrf = CSRFProtect(site)
site.register_blueprint(router)
site.logger.setLevel(Settings.LOG_LEVEL)
site.register_error_handler(404, page_not_found)
