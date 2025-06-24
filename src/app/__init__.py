from flask import Flask
from flask_mail import Mail
from flask_wtf import CSRFProtect
from settings import Settings
from app.routes import router

app = Flask(__name__)
app.config.from_object(Settings)
mail = Mail(app)
csrf = CSRFProtect(app)
app.register_blueprint(router)
app.logger.setLevel(Settings.LOG_LEVEL)
