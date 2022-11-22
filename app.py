import os
import logging

from flask import Flask, render_template, g, session
from exts import db, mail_sender

app = Flask(__name__)
upload_logo_dir = os.path.join(app.root_path, 'static/shop_logo')

from blueprint.user_blueprint import user_bp
from blueprint.profile_blueprint import profile_bp

import staticContents
import configs
from models import Customer

app.config.from_object(configs)
db.init_app(app)
mail_sender.init_app(app)
app.register_blueprint(profile_bp)
app.register_blueprint(user_bp)

# set the global lowest recorded level
logging.basicConfig(level=logging.DEBUG)
# create handlers
info_handler = logging.FileHandler('logs/info.log')
waring_handler = logging.FileHandler('logs/warning.log')
error_handler = logging.FileHandler('logs/error.log')
# set the lowest accept level for each handler
info_handler.setLevel(logging.INFO)
waring_handler.setLevel(logging.WARNING)
error_handler.setLevel(logging.ERROR)
# set the log format
log_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
error_handler.setFormatter(log_format)
info_handler.setFormatter(log_format)
waring_handler.setFormatter(log_format)
# activate handlers
app.logger.addHandler(info_handler)
app.logger.addHandler(waring_handler)
app.logger.addHandler(error_handler)

@app.route('/')
def index():
    db.create_all(app=app)
    if "email" in session:
        email = session["email"]
        user = Customer.query.filter_by(email=email).first()
        return render_template("index.html", user=user, categories=staticContents.categories)
    return render_template("index.html", user=None, categories=staticContents.categories)

if __name__ == '__main__':
    app.run()
