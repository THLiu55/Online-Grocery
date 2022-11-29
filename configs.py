# database configurations
import os

# Please remember to add environment variables

# set database configurations
SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_TYPE") + os.getcwd() + os.path.sep + os.environ.get("DATABASE_NAME")
SQLALCHEMY_TRACK_MODIFICATIONS = True

SECRET_KEY = os.environ.get('SECRET_KEY')

# email configurations
MAIL_SERVER = os.environ.get("MAIL_SERVER")
MAIL_PORT = os.environ.get("MAIL_PORT")
MAIL_USE_TLS = False
MAIL_USE_SSL = True
MAIL_DEBUG = True
MAIL_USERNAME = os.environ.get("MAIL_USERNAME")
MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
MAIL_DEFAULT_SENDER = MAIL_USERNAME
