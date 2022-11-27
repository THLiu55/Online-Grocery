import random
from datetime import datetime
from json import dumps

from flask import Blueprint, render_template, request, redirect, url_for, g, jsonify, session
from sqlalchemy import delete

from forms import RegisterForm, LoginForm, SearchForm
from models import Customer, Captcha, ShoppingList, Order
from exts import db, mail_sender
from flask_mail import Message
import staticContents
from werkzeug.security import generate_password_hash, check_password_hash

user_bp = Blueprint("User", __name__, url_prefix="/user")


@user_bp.route("/login", methods=['GET', 'POST'])
def login():
    login_form = LoginForm()
    register_form = RegisterForm()

    if request.method == 'GET':
        return render_template('login.html', register_form=register_form, login_form=login_form)
    else:
        operation = request.args.get('type')
        if operation == "login":
            if login_form.validate_on_submit():
                email = login_form.email_login.data
                password = login_form.password_login.data
                user_tmp = Customer.query.filter_by(email=email).first()
                if (user_tmp is not None) and (check_password_hash(user_tmp.password, password)):
                    session["email"] = user_tmp.email
                    return jsonify({"code": 200, 'message': "ok"})
                return jsonify({"code": 400, 'message': "wrong email or password"})
            else:
                # get and return the first error message generate by validator
                for e in login_form.errors:
                    return jsonify({'code': 401, 'message': login_form.errors.get(e)[0]})
        elif operation == "signup":
            if register_form.validate_on_submit():
                email = register_form.email.data
                captcha = register_form.captcha.data
                username = register_form.username.data
                password = register_form.password.data
                user_tmp = Customer.query.filter_by(email=email).first()
                user_tmp2 = Customer.query.filter_by(userName=username).first()
                pair = Captcha.query.filter_by(email=email).first()
                if (user_tmp is None) and (user_tmp2 is None) and (pair is not None):  # if username is unique & email with captcha has been sent
                    if (datetime.now() - pair.create_time).seconds > 1800:  # check if captcha is out of date
                        return jsonify({'code': 400, 'message': "captcha out of time"})
                    if pair.captcha != captcha:  # check if captcha is correct
                        return jsonify({'code': 400, 'message': "captcha wrong"})
                    # store new customer item into database
                    new_customer = Customer(password=generate_password_hash(password), userName=username, email=email)
                    db.session.add(new_customer)
                    db.session.commit()
                    # initiate corresponding shopping car
                    shopping_car = ShoppingList(user_id=new_customer.id, total_cost=0)
                    db.session.add(shopping_car)
                    db.session.commit()
                    g.user = new_customer
                    return jsonify({'code': 200, 'message': ""})
                if user_tmp is not None:
                    return jsonify({'code': 400, 'message': "registered email"})
                if user_tmp2 is not None:
                    return jsonify({'code': 400, 'message': "registered user name"})
                if pair is None:
                    return jsonify({'code': 400, 'message': "email not validate"})
            else:
                # get and return the first error message generate by validator
                for e in register_form.errors:
                    return jsonify({'code': 400, 'message': register_form.errors.get(e)[0]})
        elif operation == "send":
            # get email address
            form = request.form
            email = form["email"]
            user_tmp = Customer.query.filter_by(email=email).first()  # check if the email has been registered
            if user_tmp is None:
                # generate the captcha of the account
                captcha = generateCaptcha()
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
                    html=render_template('email_register.html', captcha=captcha)
                )
                mail_sender.send(message)
                return jsonify({'code': 200})
            return jsonify({'code': 400, 'message': "registered email"})
        else:
            return render_template("index.html", user=g.user, categories=staticContents.categories)








# backend support for finding back (reset) password
@user_bp.route("/findPassword",  methods=["POST"])
def find_back():
    method = request.args.get('type')
    # get posted form
    form = request.form
    if method == "send":
        # get email
        email = form["email"]
        # here the email format validity has already been checked
        user_tmp = Customer.query.filter_by(email=email).first()  # check if the email has been registered
        if user_tmp is not None:
            # generate the captcha of the account
            captcha = generateCaptcha()
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
                subject="Find back your password",
                recipients=[email],
                html=render_template('email_password_findback.html', captcha=captcha)
            )
            mail_sender.send(message)
            return jsonify({'code': 200, 'message': "email send successfully"})
        return jsonify({'code': 400, 'message': "email not registered"})
    elif method == "captcha":
        # get email & corresponding captcha
        email = form["email"]
        captcha = form["captcha"]
        if checkCaptcha(email=email, captcha=captcha):
            return jsonify({'code':200, 'message': "captcha correct"})
        return jsonify({"code": 200, "message": "wrong captcha"})
    else:
        # get email & captcha & new password
        email = form["email"]
        captcha = form["captcha"]
        password = form["password"]
        # check if captcha match
        if checkCaptcha(email=email, captcha=captcha):
            # get the user object
            user_tmp = Customer.query.filter_by(email=email).first()
            # reset his password
            user_tmp.password = generate_password_hash(password)
            db.session.commit()
            return jsonify({"code": 200, "message": "reset done"})
        return jsonify({"code": 400, "message": "Fail to reset, please try again"})


# check captcha
def checkCaptcha(email, captcha):
    pair_tmp = Captcha.query.filter_by(email=email).first()
    if pair_tmp is not None and pair_tmp.captcha == captcha:
        return True
    return False


# check input format in register form
def formatCheck(username, password):
    name_len = len(username)
    if name_len < 3 or name_len > 20:
        return 1  # return 1 means username format problem
    have_letter = False
    have_num = False
    have_cap = False
    password_len = len(password)
    for s in password:
        if s.isdigit():
            have_num = True
            continue
        if s.isalpha():
            have_letter = True
        if s.isupper():
            have_cap = True
    print(str(have_num) + " " + str(have_cap) + " " + str(have_letter))
    if have_num and have_cap and have_letter and 20 >= password_len >= 6:
        return 0  # return 0 means both password and username have right format
    return 2  # return 2 means wrong format on password


# generate captcha (random int * 6)
def generateCaptcha():
    captcha = ""
    for i in range(6):
        captcha += str(random.randint(0, 9))
    return captcha


@user_bp.route('/shopping-bag')
def shopping_bag():
    if "email" in session:
        searchForm = SearchForm()
        email = session["email"]
        user = Customer.query.filter_by(email=email).first()
        if request.args.get("type") == "load":
            res = {}
            for order in user.shoppingList[0].orders:
                shop_name = order.product.shop.name
                if shop_name not in res:
                    res[shop_name] = []
                res[shop_name].append(dumps({"cost": order.cost, "amount": order.good_amount, "order_id": order.id,
                                             "pic_address": order.product.picture_address, "name": order.product.name,
                                             "description": order.product.description}))
            print(res)
            return jsonify({"code": 200, "message": dumps(res)})
        if request.args.get("type") == "remove":
            removed_id = int(request.args.get('id'))
            Order.query.filter(Order.id == removed_id).delete()
            db.session.commit()
            print("here")
            return jsonify({'code': 200, 'message': 'success'})
        if request.args.get("type") == "addAmount":
            order_id = int(request.args.get('id'))
            order = Order.query.filter_by(id=order_id).first()
            amount = order.good_amount
            order.good_amount = amount + 1
            db.session.commit()
            return jsonify({"code": 200, "message": "success"})
        if request.args.get("type") == "reduceAmount":
            order_id = int(request.args.get('id'))
            order = Order.query.filter_by(id=order_id).first()
            amount = order.good_amount
            if amount == 1:
                return jsonify({"code": 400, "message": "can't less than one"})
            else:
                order.good_amount = amount - 1
                db.session.commit()
                return jsonify({"code": 200, "message": "success"})
        return render_template('shopping_bag.html', searchForm=searchForm, use=user)
    else:
        return redirect(url_for("login"))


@user_bp.route('/logout')
def logout():
    del session["email"]
    return redirect(url_for("index"))


@user_bp.route("/jump/<address>", methods=['GET'])
def jump(address):
    return render_template(address)
