from flask import Flask, Blueprint

from main.extensions import db, migrate, cors
from main.settings import DevSettings
from flask_jwt_extended import JWTManager

from main.modules import user, diet


MODULES = [user, diet]


main = Blueprint('main', __name__)


def create_app(settings=DevSettings):
    app = Flask(__name__)
    # Setup the Flask-JWT-Extended extension
    app.config["JWT_SECRET_KEY"] = "assmzfadiab"
    jwt = JWTManager(app)

    # Utiliser la configuration (settings).
    app.config.from_object(settings)
    # On initialise les libraries Python.
    # Init SQLAlchemy.
    db.init_app(app)
    cors.init_app(app)

    # Init Migrate.
    migrate.init_app(app, db)
    app.register_blueprint(main)
    register_modules(app)
    register_shell_context(app)

    return app


def register_shell_context(app):
    def shell_context():
        return {'db': db}
    app.shell_context_processor(shell_context)


def register_modules(app):
    for m in MODULES:
        if hasattr(m, 'api'):
            app.register_blueprint(m.api)


@main.route('/')
@main.route('/index')
def index():
    return 'First Page, Ici sera notre projet.'
