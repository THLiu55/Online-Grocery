from flask import Flask, render_template
from exts import db
from blueprint.user_blueprint import user_bp
from blueprint.user_blueprint import user
import configs

app = Flask(__name__)
app.config.from_object(configs)
db.init_app(app)
app.register_blueprint(user_bp)

@app.route('/')
def index():
    return render_template("MainpageBase.html", user=user)


if __name__ == '__main__':
    app.run()
