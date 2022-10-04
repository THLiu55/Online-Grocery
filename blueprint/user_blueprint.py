import random
from datetime import datetime
from flask import Blueprint, render_template, request, redirect, url_for
from models import Customer, Captcha
from exts import db, mail_sender
from flask_mail import Message


user_bp = Blueprint("User", __name__, url_prefix="/user")

# Global
user = None


@user_bp.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        global user
        result = request.form
        email = result['email']
        password = result['password']
        user_tmp = Customer.query.filter_by(email=email).first()
        if user_tmp is not None:
            if password == user_tmp.password:
                user = user_tmp
                return render_template('MainpageBase.html')
        return render_template('login.html')
    else:
        return render_template('login.html')


@user_bp.route("/captcha", methods=["POST"])
def captcha():
    # here the email format validity has already been checked
    result = request.form
    email = result["email"]
    user_tmp = Customer.query.filter_by(email=email).first() # check if the email has been registered
    if user_tmp is None:
        # generate the captcha of the account
        captcha = ""
        for i in range(6):
            captcha += str(random.randint(0, 9))
        # store the email-captcha pair to database
        pair = Captcha.query.filter_by(email=email).first()
        if pair is None:  # no pair -> init a new pair
            pair = Captcha(email=email, captcha=captcha, create_time=datetime.now())
            db.session.add(pair)
            db.session.commit()
        else:  # have old pair -> update captcha & create time
            pair.captcha = captcha
            pair.create_time = datetime.now()
            db.session.commit()
        # send email to user's email address
        message = Message(
            subject="Welcome to register GoGrocery",
            recipients=[email],
            html=render_template('email.html', captcha=captcha)
        )
        mail_sender.send(message)
        return {'code': 200}
    return {'code': 400, 'message': "registered email"}



@user_bp.route("/register", methods=["GET", "POST"])
def register():
    global user
    result = request.form
    username = result['username']
    email = result['email']
    password = result['password']
    validation = result['validation']
    user_tmp = Customer.query.filter_by(email=email).first()
    if user_tmp is None:
        user = Customer(userName=username, password=password)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('index'))
    else:
        return redirect(url_for('register'))


@user_bp.route("/profile")
def profile():
    if user is None:
        return render_template('login.html')
    else:
        return render_template('profile.html')


@user_bp.route('/shopping-bag')
def shopping_bag():
    if user is None:
        return render_template('login.html')
    else:
        return render_template('shopping_bag.html')


@user_bp.route('/logout')
def logout():
    global user
    user = None
    return redirect(url_for("index"))


@user_bp.route("/jump/<address>", methods=['GET'])
def jump(address):
    return render_template(address)