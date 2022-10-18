# database configurations
import os

SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.getcwd() + os.path.sep + "online_shop.db"
SQLALCHEMY_TRACK_MODIFICATIONS = True

SECRET_KEY = os.environ.get('SECRETE_KEY')

# email configurations
MAIL_SERVER = "smtp.163.com"
MAIL_PORT = 465
MAIL_USE_TLS = False
MAIL_USE_SSL = True
MAIL_DEBUG = True
MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
MAIL_DEFAULT_SENDER = MAIL_USERNAME
