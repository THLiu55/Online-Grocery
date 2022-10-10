from flask import Flask, render_template, g
from exts import db, mail_sender
from blueprint.user_blueprint import user_bp
import configs

app = Flask(__name__)
app.config.from_object(configs)
db.init_app(app)
mail_sender.init_app(app)
app.register_blueprint(user_bp)

@app.route('/')
def index():
    db.create_all()
    return render_template("MainpageBase.html", user=g.get('user', None))


if __name__ == '__main__':
    app.run()
