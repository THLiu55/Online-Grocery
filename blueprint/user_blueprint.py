import random
from datetime import datetime
from flask import Blueprint, render_template, request, redirect, url_for, g, jsonify
from models import Customer, Captcha
from exts import db, mail_sender
from flask_mail import Message
from werkzeug.security import generate_password_hash, check_password_hash

user_bp = Blueprint("User", __name__, url_prefix="/user")


@user_bp.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        form = request.form
        email = form['email']
        password = form['password']
        user_tmp = Customer.query.filter_by(email=email).first()
        if (user_tmp is not None) and (check_password_hash(user_tmp.password, password)):
            g.user = user_tmp
            return render_template('MainpageBase.html')
        return jsonify({'code': 400, 'message': 'email or password not correct'})
    else:
        return render_template('login.html')


@user_bp.route("/register", methods=["GET", "POST"])
def register():
    method = request.args.get('type')
    if method == "send":  # if send email button clicked, go here
        # get email address
        form = request.form
        email = form["email"]
        # here the email format validity has already been checked
        user_tmp = Customer.query.filter_by(email=email).first()  # check if the email has been registered
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
            return jsonify({'code': 200})
        return jsonify({'code': 400, 'message': "registered email"})
    else:  # confirm register clicked, go here
        form = request.form
        # if the computer goes here, the format validation has all been checked
        username = form.get("username")
        password = generate_password_hash(form.get("password"))
        email = form.get("email")
        captcha = form.get("captcha")
        user_tmp = Customer.query.filter_by(userName=username).first()
        pair = Captcha.query.filter_by(email=email).first()
        if (user_tmp is None) and (pair is not None):  # if username is unique & email with captcha has been sent
            if (datetime.now() - pair.create_time).seconds > 1800:  # check if captcha is out of date
                return {'code': 400, 'message': "captcha out of time"}
            if pair.captcha != captcha:  # check if captcha is correct
                return {'code': 400, 'message': "captcha wrong"}
            # store new customer item into database
            new_customer = Customer(password=password, userName=username, email=email)
            db.session.add(new_customer)
            db.session.commit()
            return jsonify({'code': 200})
        return jsonify({'code': 400, 'message': "registered username"})


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