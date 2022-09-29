HOSTNAME = '127.0.0.1'
PORT     = '3306'
DATABASE = 'online_shop'
USERNAME = 'root'
PASSWORD = 'lcjxljlth502'
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(USERNAME,PASSWORD,HOSTNAME,PORT,DATABASE)
SQLALCHEMY_DATABASE_URI = DB_URI
SECRET_KEY = 'qr9ur34567823disdha3'