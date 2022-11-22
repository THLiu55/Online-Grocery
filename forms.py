from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed
from wtforms import StringField, PasswordField, FloatField, validators, EmailField, FileField, SubmitField, \
    TextAreaField, SelectField
from wtforms.validators import InputRequired, Length, AnyOf, Email, EqualTo


class RegisterForm(FlaskForm):
    username = StringField(validators=[Length(min=3, max=20, message="username length must between 3 and 20")])
    email = EmailField(validators=[InputRequired(), Email(message="not an email")])
    password = PasswordField(validators=[Length(min=6, max=20, message="password length must between 6 and 20")])
    repassword = PasswordField(validators=[InputRequired(), EqualTo('password', message="not match")])
    captcha = StringField(validators=[Length(min=6, max=6, message="length not correct")])


class LoginForm(FlaskForm):
    email_login = EmailField(validators=[InputRequired(), Email(message="not an email")])
    password_login = PasswordField(validators=[InputRequired(), Length(min=6, max=20, message="password length must between 6 and 20")])


class ShopRegisterForm(FlaskForm):
    logo = FileField(validators=[InputRequired(message="shop logo can't be empty"), FileAllowed(['jpg', 'png'])])
    shop_name = StringField(validators=[InputRequired(message="shop name can't be empty"), Length(min=3, max=100)])
    description = TextAreaField(validators=[InputRequired(message="shop description can't be empty")])


class NewProductForm(FlaskForm):
    product_pic = FileField(validators=[InputRequired(message="product picture can't be empty"), FileAllowed(['jpg', 'png'])])
    product_name = StringField(validators=[InputRequired(message="product name can't be empty"), Length(min=3, max=100)])
    description = TextAreaField(validators=[InputRequired(message="product description can't be empty")])
    price = FloatField(validators=[InputRequired(message="please set the price")])
    tag = SelectField(choices=[('cloth', 'cloth'), ('furniture', 'furniture'), ('electronic', 'electronic'), ('shoe', 'shoe'), ('toy', 'toy'),
                               ('food', 'food'), ('necessity', 'necessity'), ('book', 'book'), ('else', 'else')])

    

