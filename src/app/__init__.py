"""\file __init__.py
\brief Initialize the CVbuilder Flask application.

\details Initializes the Flask application, configures its settings, mail system,
CSRF protection, registers routes, sets logging level and an error handler
for 404 pages.


\version 0.1
\copyright MIT License

\var site  The main Flask application instance.
\var mail  Flask-Mail extension for email functionality.
\var csrf  Flask-WTF extension for CSRF protection.
"""

from flask import Flask
from flask_mail import Mail
from flask_wtf import CSRFProtect

from app.routes import page_not_found, router
from settings import Settings

# Initialize the main Flask application object.
site = Flask(__name__)

# Load application configuration from the Settings object.
site.config.from_object(Settings)

# Initialize Flask-Mail for handling email sending.
mail = Mail(site)

# Initialize Flask-WTF for CSRF protection.
csrf = CSRFProtect(site)

# Register the Blueprint with application routes.
site.register_blueprint(router)

# Set the logging level for the application.
site.logger.setLevel(Settings.LOG_LEVEL)

# Register the handler for 404 errors (Page Not Found).
site.register_error_handler(404, page_not_found)
