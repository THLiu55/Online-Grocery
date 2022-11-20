from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed
from wtforms import StringField, PasswordField, validators, EmailField, FileField, SubmitField, TextAreaField
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
    shop_name = StringField(validators=[InputRequired(), Length(min=3, max=100)])
    description = TextAreaField(validators=[InputRequired()])
    logo = FileField(validators=[FileAllowed(['jpg', 'png'])])
    submit = SubmitField()
