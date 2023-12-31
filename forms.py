from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed
from sqlalchemy import Float
from wtforms import StringField, PasswordField, FloatField, EmailField, FileField, SubmitField, \
    TextAreaField, SelectField, IntegerField
from wtforms.validators import InputRequired, Length, Email, EqualTo, NumberRange


# the form to register
class RegisterForm(FlaskForm):
    username = StringField(validators=[Length(min=3, max=20, message="username length must between 3 and 20")])
    email = EmailField(validators=[InputRequired(), Email(message="not an email")])
    password = PasswordField(validators=[Length(min=6, max=20, message="password length must between 6 and 20")])
    repassword = PasswordField(validators=[InputRequired(), EqualTo('password', message="not match")])
    captcha = StringField(validators=[Length(min=6, max=6, message="length not correct")])


# the form for login
class LoginForm(FlaskForm):
    email_login = EmailField(validators=[InputRequired(), Email(message="not an email")])
    password_login = PasswordField(validators=[InputRequired(), Length(min=6, max=20, message="password length must between 6 and 20")])


# the form for register a shop
class ShopRegisterForm(FlaskForm):
    logo = FileField(validators=[InputRequired(message="shop logo can't be empty"), FileAllowed(['jpg', 'png', 'jpeg', 'webp'])])
    shop_name = StringField(validators=[InputRequired(message="shop name can't be empty"), Length(min=3, max=100)])
    description = TextAreaField(validators=[InputRequired(message="shop description can't be empty")])


# the form to add a new product
class NewProductForm(FlaskForm):
    product_pic = FileField(validators=[InputRequired(message="product picture can't be empty"), FileAllowed(['jpg', 'png', 'jpeg', 'webp'])])
    product_name = StringField(validators=[InputRequired(message="product name can't be empty"), Length(min=3, max=100)])
    description = TextAreaField(validators=[InputRequired(message="product description can't be empty")])
    price = FloatField('price', validators=[InputRequired(message="please set the price")])
    tag = SelectField(choices=[('cloth', 'cloth'), ('furniture', 'furniture'), ('electronic', 'electronic'), ('shoe', 'shoe'), ('toy', 'toy'),
                               ('food', 'food'), ('necessity', 'necessity'), ('book', 'book'), ('else', 'else')])


# the form to add some goods into shopping cart
class AddToCartForm(FlaskForm):
    amount = IntegerField(validators=[InputRequired("please enter the amount you wanna buy"), NumberRange(min=1, max=10000000)])
    submit = SubmitField()


class SearchForm(FlaskForm):
    product_name = StringField(validators=[Length(min=1, max=200, message="no more than 200 characters")])
    tag = SelectField(choices=[('All', 'all'), ('cloth', 'cloth'), ('furniture', 'furniture'), ('electronic', 'electronic'), ('shoe', 'shoe'), ('toy', 'toy'),
                               ('food', 'food'), ('necessity', 'necessity'), ('book', 'book'), ('else', 'else')])
    submit = SubmitField()