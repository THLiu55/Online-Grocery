from flask import Flask, render_template
from exts import db
from models import User, ShoppingList, Order, Product, Shop
import configs

app = Flask(__name__)
app.config.from_object(configs)
db.init_app(app)


@app.route('/')
def index():  # put application's code here
    return render_template("MainpageBase.html")


if __name__ == '__main__':
    app.run()

