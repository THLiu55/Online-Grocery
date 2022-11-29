from flask import Blueprint, request, session, render_template

from forms import SearchForm
from models import Shop, Customer

shop_bp = Blueprint("Shop", __name__, url_prefix="/shop")

@shop_bp.route("/")
def shop():
    user = None
    # load the user
    if "email" in session:
        email = session["email"]
        user = Customer.query.filter_by(email=email).first()
    name = request.args.get("name")
    shop_detail = Shop.query.filter_by(name=name).first()
    return render_template("shop_inside.html", user=user, shop=shop_detail, searchForm=SearchForm())
