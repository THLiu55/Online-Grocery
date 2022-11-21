import os

from werkzeug.utils import secure_filename

from exts import db
from flask import Blueprint, render_template, redirect, url_for, jsonify, session, request
from models import Customer, Shop
from forms import ShopRegisterForm

profile_bp = Blueprint("Profile", __name__, url_prefix="/profile")


@profile_bp.route("/", methods=["GET", "POST"])
def index():
    if "email" in session:
        email = session["email"]
        user = Customer.query.filter_by(email=email).first()
        form = ShopRegisterForm()
        if request.method == "POST":
            if form.validate_on_submit():
                shop_name = form.shop_name.data
                shop_description = form.description.data
                shop_logo = form.logo.data
                logo_name = str(user.id) + "_" + shop_logo.filename
                logo_path = 'static' + os.sep + 'shop_logo' + os.sep + logo_name
                shop_logo.save(logo_path)
                shop = Shop(name=shop_name, logo_address=logo_name, description=shop_description, user_id=user.id)
                db.session.add(shop)
                db.session.commit()
                return jsonify({'code': 200, 'message': "success"})
            else:
                for e in form.errors:
                    return jsonify({'code': 400, 'message': form.errors.get(e)[0]})

        if user.shop:
            return render_template('profile.html', user=user, form=form, shop=user.shop[0])
        else:
            return render_template('profile.html', user=user, form=form, shop=None)
    return redirect(url_for("login"))