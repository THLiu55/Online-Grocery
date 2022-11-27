import os
import logging

from flask import Flask, render_template, g, session, request, redirect, url_for
from exts import db, mail_sender
from sqlalchemy import and_, or_

from forms import SearchForm

app = Flask(__name__)
upload_logo_dir = os.path.join(app.root_path, 'static/shop_logo')

# logging.basicConfig(filename='test.log', level=logging.INFO)

from blueprint.user_blueprint import user_bp
from blueprint.profile_blueprint import profile_bp
from blueprint.product_blueprint import product_bp

import staticContents
import configs
from models import Customer, Product

app.config.from_object(configs)
db.init_app(app)
mail_sender.init_app(app)

app.register_blueprint(profile_bp)
app.register_blueprint(user_bp)
app.register_blueprint(product_bp)

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


@app.route('/', methods=['GET', 'POST'])
def index():
    searchForm = SearchForm()
    user = None
    if "email" in session:
        email = session["email"]
        user = Customer.query.filter_by(email=email).first()
    return render_template("index.html", user=user, categories=staticContents.categories, searchForm=searchForm)


@app.route("/search/", methods=['POST'])
def search():
    searchForm = SearchForm()
    if searchForm.validate_on_submit():
        keyword = searchForm.product_name.data
        page_data = Product.query.filter(Product.name.like("%" + keyword + "%"))
        return render_template("search_result.html", page_data=page_data, keywords=keyword, searchForm=searchForm)
    else:
        return redirect(url_for("index"))


if __name__ == '__main__':
    app.run(debug=True)
