from flask import Blueprint, render_template, request, redirect, url_for
from models import User
from exts import db


user_bp = Blueprint("User", __name__, url_prefix="/user")

# Global
user = None


@user_bp.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        global user
        result = request.form
        username = result['username']
        password = result['password']
        user_tmp = User.query.filter_by(userName=username).first()
        if user_tmp is not None:
            if password == user_tmp.password:
                user = user_tmp
                return redirect(url_for("index"))
        return render_template('login.html')
    else:
        return render_template('login.html')

@user_bp.route("/register", methods=["GET", "POST"])
def register():
    global user
    result = request.form
    username = result['username']
    password = result['password']
    user_tmp = User.query.filter_by(userName=username).first()
    if user_tmp is None:
        user = User(userName=username, password=password)
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
    return redirect("index")


@user_bp.route("/jump/<address>", methods=['GET'])
def jump(address):
    return render_template(address)