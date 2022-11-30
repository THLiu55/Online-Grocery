import os
import logging

from flask import Flask, render_template, g, session, request, redirect, url_for
from exts import db, mail_sender
from sqlalchemy import and_, or_

from forms import SearchForm
from blueprint.user_blueprint import user_bp
from blueprint.profile_blueprint import profile_bp
from blueprint.product_blueprint import product_bp
from blueprint.shop_blueprint import shop_bp

import staticContents
import configs
from models import Customer, Product, Order, ShoppingList, Shop, Captcha
from logging.config import dictConfig


# # create handlers
# info_handler = logging.FileHandler('logs/info.log')
# waring_handler = logging.FileHandler('logs/warning.log')
# error_handler = logging.FileHandler('logs/error.log')
# # set the lowest accept level for each handler
# info_handler.setLevel(logging.INFO)
# waring_handler.setLevel(logging.WARNING)
# error_handler.setLevel(logging.ERROR)
# # set the log format
# log_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# error_handler.setFormatter(log_format)
# info_handler.setFormatter(log_format)
# waring_handler.setFormatter(log_format)
# # activate handlers
# app.logger.setLevel(logging.INFO)
# app.logger.addHandler(info_handler)
# app.logger.addHandler(waring_handler)
# app.logger.addHandler(error_handler)
#
# log_myapp_debug = app.logger.getChild("debug")
# log_myapp_warn = app.logger.getChild("warn")
# log_myapp_err = app.logger.getChild("error")
#
# log_myapp_debug.setLevel(logging.DEBUG)
# log_myapp_debug.addHandler(logging.FileHandler('debug.log'))
#
# log_myapp_warn.setLevel(logging.WARNING)
# log_myapp_warn.addHandler(logging.FileHandler('warn.log'))
#
# log_myapp_err.setLevel(logging.ERROR)
# log_myapp_err.addHandler(logging.FileHandler('err.log'))


dictConfig(
    {
        'version': 1,
        'formatters': {
            'default': {
                'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
            }
        },
        'handlers': {
            'wsgi': {
                'class': 'logging.StreamHandler',
                'stream': 'ext://flask.logging.wsgi_errors_stream',
                'formatter': 'default'
            }
        },
        'root': {
            'level': 'INFO',
            'handlers': ['wsgi']
        }
    }
)


app = Flask(__name__)
upload_logo_dir = os.path.join(app.root_path, 'static/shop_logo')

app.config.from_object(configs)
db.init_app(app)
mail_sender.init_app(app)

app.register_blueprint(profile_bp)
app.register_blueprint(user_bp)
app.register_blueprint(product_bp)
app.register_blueprint(shop_bp)

@app.route('/', methods=['GET', 'POST'])
def index():
    # init forms
    searchForm = SearchForm()
    user = None
    # load the user
    if "email" in session:
        email = session["email"]
        user = Customer.query.filter_by(email=email).first()
    return render_template("index.html", user=user, categories=staticContents.categories, searchForm=searchForm)


@app.route("/search/", methods=['POST', 'GET'])
def search():
    # init forms
    search_form = SearchForm()
    if request.method == 'POST':
        if search_form.validate_on_submit():
            # search items by name and tag
            keyword = search_form.product_name.data
            tag = search_form.tag.data
            if tag == "All":
                page_data = Product.query.filter(Product.name.like("%" + keyword + "%"))
            else:
                page_data = Product.query.filter(and_(Product.name.like("%" + keyword + "%"), Product.tag == tag))
            return render_template("search_result.html", page_data=page_data, keywords=keyword, searchForm=search_form)
        else:
            return redirect(url_for("index"))
    else:
        # click the card in home page == search all items with that tag
        tag = request.args.get("tag")
        page_data = Product.query.filter(Product.tag == tag)
        return render_template("search_result.html", page_data=page_data, keywords='', searchForm=search_form)


@app.route('/clear')
def clear():
    # clear all records in database
    db.session.query(Order).delete()
    db.session.query(ShoppingList).delete()
    db.session.query(Product).delete()
    db.session.query(Shop).delete()
    db.session.query(Customer).delete()
    db.session.query(Captcha).delete()
    db.session.commit()
    return render_template("index.html", user=None, categories=staticContents.categories, searchForm=SearchForm())


if __name__ == '__main__':
    app.run(debug=True)
