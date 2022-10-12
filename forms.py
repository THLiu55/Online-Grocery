from flask_wtf import FlaskForm
from wtforms import StringField, EmailField
from wtforms.validators import length, email


class RegisterForm(FlaskForm):
    userName = StringField("userName", validators=[length(min=3, max=20)])
    password = StringField("password", validators=[length(min=6, max=20)])
    rePassword = StringField("password", validators=[length(min=6, max=20)])
    email = EmailField("email", validators=[email()])
    captcha = StringField(validators=[length(min=6, max=6)])


class LoginForm(FlaskForm):
    email = EmailField("email", validators=[email()])
    password = StringField("password", validators=[length(min=6, max=20)])
