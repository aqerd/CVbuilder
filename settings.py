import logging
import os


class Settings:
    GROQCLOUD_API_KEY = os.getenv("GROQCLOUD_API_KEY")
    SECRET_KEY = os.urandom(36)
    MAIL_SERVER = os.getenv("MAIL_SERVER")
    MAIL_PORT = int(os.getenv("MAIL_PORT"))
    MAIL_USE_TLS = bool(os.getenv("MAIL_USE_TLS"))
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = (
        os.getenv("MAIL_DEFAULT_SENDER_FROM"),
        os.getenv("MAIL_USERNAME"),
    )
    THEMES_FILE_PATH = os.getenv("THEMES_FILE_PATH")
    REGULAR_FONT_PATH = os.getenv("REGULAR_FONT_PATH")
    BOLD_FONT_PATH = os.getenv("BOLD_FONT_PATH")
    SYSTEM_PROMPT_FILE_PATH = os.getenv("SYSTEM_PROMPT_FILE_PATH")
    DEBUG_APP = bool(os.getenv("DEBUG_APP"))
    HOST_APP = os.getenv("HOST_APP")
    PORT_APP = int(os.getenv("PORT_APP"))
    LOG_LEVEL = logging.INFO
