import os

from exts import db
from flask import Blueprint, render_template, redirect, url_for, jsonify, session, request
from models import Customer, Shop, Product
from forms import ShopRegisterForm, NewProductForm, SearchForm

profile_bp = Blueprint("Profile", __name__, url_prefix="/profile")

# this is the backend for profile page


@profile_bp.route("/", methods=["GET", "POST"])
def profile():
    searchForm = SearchForm()
    if "email" in session:
        # load user
        email = session["email"]
        user = Customer.query.filter_by(email=email).first()
        shop_register_form = ShopRegisterForm()
        new_product_form = NewProductForm()
        if request.method == "POST":
            operation = request.args.get('type')
            # the service for registering a new shop
            if operation == "register":
                if shop_register_form.validate_on_submit():
                    shop_name = shop_register_form.shop_name.data
                    if Shop.query.filter_by(name=shop_name).first():
                        return jsonify({'code': 400, 'message': "shop name is in use"})
                    shop_description = shop_register_form.description.data
                    shop_logo = shop_register_form.logo.data
                    logo_name = str(user.id) + "_" + shop_logo.filename
                    logo_path = 'static' + os.sep + 'shop_logo' + os.sep + logo_name
                    shop_logo.save(logo_path)
                    shop = Shop(name=shop_name, logo_address=logo_name, description=shop_description, user_id=user.id)
                    db.session.add(shop)
                    db.session.commit()
                    return jsonify({'code': 200, 'message': "success"})
                else:
                    # get the first error message from the WTForm
                    for e in shop_register_form.errors:
                        return jsonify({'code': 400, 'message': shop_register_form.errors.get(e)[0]})
            # the service to remove a product
            elif operation == "remove":
                product_id = request.args.get("id")
                product = Product.query.filter_by(id=product_id).first()
                db.session.delete(product)
                db.session.commit()
                return jsonify({'code': 200, 'message': 'success'})
            # the service for adding a new product
            else:
                if new_product_form.validate_on_submit():
                    price = new_product_form.price.data
                    name = new_product_form.product_name.data
                    description = new_product_form.description.data
                    tag = new_product_form.tag.data
                    shop_id = user.shop[0].id
                    product_img = new_product_form.product_pic.data
                    product_img_name = product_img.filename
                    img_path = 'static' + os.sep + 'product_img' + os.sep + product_img_name
                    product_img.save(img_path)
                    product = Product(price=price, name=name, description=description, tag=tag, shop_id=shop_id, picture_address=product_img_name)
                    db.session.add(product)
                    db.session.commit()

                    return jsonify({"code": 200, "message": "success"})
                else:
                    # get the first error message from the WTForm
                    for e in new_product_form.errors:
                        return jsonify({'code': 400, 'message': new_product_form.errors.get(e)[0]})

        # load the profile page
        if user.shop:
            return render_template('profile.html', user=user, form=shop_register_form, form1=new_product_form, shop=user.shop[0], searchForm=searchForm)
        else:
            return render_template('profile.html', user=user, form=shop_register_form, form1=new_product_form, shop=None, searchForm=searchForm)
    return redirect(url_for("login"))