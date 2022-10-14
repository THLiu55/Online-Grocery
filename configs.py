# database configurations
HOSTNAME = '127.0.0.1'
PORT     = '3306'
DATABASE = 'online_shop'
USERNAME = 'root'
PASSWORD = 'lcjxljlth502'
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(USERNAME,PASSWORD,HOSTNAME,PORT,DATABASE)
SQLALCHEMY_DATABASE_URI = DB_URI
SECRET_KEY = 'qr9ur34567823disdha3'

SQLALCHEMY_TRACK_MODIFICATIONS = True

# email configurations
MAIL_SERVER = "smtp.163.com"
MAIL_PORT = 465
MAIL_USE_TLS = False
MAIL_USE_SSL = True
MAIL_DEBUG = True
MAIL_USERNAME = "thliu328@163.com"
MAIL_PASSWORD = "UPYBHLJLKQZZUVRA"
MAIL_DEFAULT_SENDER = "thliu328@163.com"
