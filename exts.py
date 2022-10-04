# initialize database and email sender - to avoid infinite loop invoke between 'app' and 'user_blueprint'

from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

db = SQLAlchemy()
mail_sender = Mail()
