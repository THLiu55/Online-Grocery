from flask import Blueprint, render_template, request, redirect, url_for, g, jsonify, session

from exts import db
from forms import AddToCartForm, SearchForm
from models import Product, Customer, Order

product_bp = Blueprint("Product", __name__, url_prefix="/product")

# this is the backend for product details page

@product_bp.route("/", methods=["GET", "POST"])
def details():
    product_id = request.args.get("id")
    product = Product.query.filter_by(id=product_id).first()
    form = AddToCartForm()
    searchForm = SearchForm()
    if "email" in session:
        # load user
        email = session["email"]
        user = Customer.query.filter_by(email=email).first()
        shop_list = user.shoppingList[0]
        if request.method == "GET":
            return render_template('good_detail.html', product=product, shopList=shop_list, form=form, searchForm=searchForm)
        else:
            if form.validate_on_submit():
                # get the amount of good that added to shopping cart
                add_amount = form.amount.data
                add_cost = add_amount * product.price
                # add order
                for order in shop_list.orders:  # if the product is in shopping list -> modify its amount
                    if int(order.product_id) == int(product_id):
                        order.good_amount += add_amount
                        order.cost += add_cost
                        shop_list.total_cost += add_cost
                        db.session.commit()
                        return render_template('good_detail.html', product=product, shopList=shop_list, form=form, searchForm=searchForm)
                # the product is not in shopping list -> add an order record
                new_order = Order(good_amount=add_amount, cost=add_cost, shopping_list_id=shop_list.id, product_id=product_id)
                shop_list.total_cost += add_cost
                db.session.add(new_order)
                db.session.commit()
                return render_template('good_detail.html', product=product, shopList=shop_list, form=form, searchForm=searchForm)
    else:
        if request.method == 'GET':
            return render_template('good_detail.html', product=product, user=None, form=form, searchForm=searchForm)
        else:
            return redirect(url_for("User.login"))




