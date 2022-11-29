from exts import db

# database models


# customer table
class Customer(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userName = db.Column(db.CHAR(200), unique=True, nullable=False)
    password = db.Column(db.CHAR(200), nullable=False)
    email = db.Column(db.CHAR(200), unique=True, nullable=False)


# captcha table - generated for each registered email
class Captcha(db.Model):
    __tablename__ = 'captcha'
    email = db.Column(db.CHAR(200), primary_key=True)
    captcha = db.Column(db.CHAR(10), unique=True, nullable=False)
    create_time = db.Column(db.DateTime, nullable=False)


# shopping list table - when a customer registered, a shopping list will be created for him/her
class ShoppingList(db.Model):
    __tablename__ = 'shoppingList'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    total_cost = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('Customer', backref='shoppingList')


# the order specify the customer and product and the amount of product
class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    good_amount = db.Column(db.Integer, nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    shopping_list_id = db.Column(db.Integer, db.ForeignKey('shoppingList.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    shopping_list = db.relationship('ShoppingList', backref='orders')
    product = db.relationship('Product', backref='orders')


# the information of product
class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    price = db.Column(db.Integer, nullable=False)
    name = db.Column(db.CHAR(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    tag = db.Column(db.CHAR(200), nullable=False)
    picture_address = db.Column(db.TEXT(2000), nullable=False)
    shop_id = db.Column(db.Integer, db.ForeignKey('shop.id'))
    shop = db.relationship('Shop', backref='products')


# information of shop
class Shop(db.Model):
    __tablename__ = 'shop'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.CHAR(200), nullable=False, unique=True)
    logo_address = db.Column(db.TEXT, nullable=False)
    description = db.Column(db.TEXT, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('Customer', backref='shop')


# sequence to drop all tables:
# drop table `orders`;
# drop table `shoppingList`;
# drop table product;
# drop table shop;
# drop table user;
