import os

from flask import Flask, render_template, session, request, redirect, url_for, jsonify
from exts import db, mail_sender
from sqlalchemy import and_

from forms import SearchForm
from blueprint.user_blueprint import user_bp
from blueprint.profile_blueprint import profile_bp
from blueprint.product_blueprint import product_bp
from blueprint.shop_blueprint import shop_bp

import staticContents
import configs
from models import Customer, Product, Order, ShoppingList, Shop, Captcha
from logging.config import dictConfig


# add configurations of logger and handlers
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
            },
            'info_file': {
                "class": "logging.handlers.RotatingFileHandler",
                "level": "INFO",
                "formatter": "default",
                "filename": "./logs/info.log",
                "maxBytes": 20*1024*1024,
                "backupCount": 10,
                "encoding": "utf8",
            },
            'warn_file': {
                "class": "logging.handlers.RotatingFileHandler",
                "level": "WARNING",
                "formatter": "default",
                "filename": "./logs/warn.log",
                "maxBytes": 20*1024*1024,
                "backupCount": 10,
                "encoding": "utf8",
            },
            'error_file': {
                "class": "logging.handlers.RotatingFileHandler",
                "level": "ERROR",
                "formatter": "default",
                "filename": "./logs/error.log",
                "maxBytes": 20*1024*1024,
                "backupCount": 10,
                "encoding": "utf8",
            },
        },
        'root': {
            'level': 'INFO',
            'handlers': ['info_file', 'error_file', 'warn_file', 'wsgi']
        }
    }
)


app = Flask(__name__)
upload_logo_dir = os.path.join(app.root_path, 'static/shop_logo')

# init
app.config.from_object(configs)
db.init_app(app)
mail_sender.init_app(app)

# register blueprint
app.register_blueprint(profile_bp)
app.register_blueprint(user_bp)
app.register_blueprint(product_bp)
app.register_blueprint(shop_bp)


@app.route('/', methods=['GET', 'POST'])
def index():
    db.create_all(app=app)
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


@app.route('/mode')
def mode():
    type = request.args.get('type')
    if type == 'switch':
        mode = session.get("mode", "light")
        if mode == "light":
            session["mode"] = "dark"
        else:
            session["mode"] = "light"
    return jsonify({"code": 200, "message": session.get("mode", "light")})


if __name__ == '__main__':
    app.run(debug=True)
