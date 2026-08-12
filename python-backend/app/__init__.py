from flask import Flask
from flask_cors import CORS

from .config import Config
from .routes.chat_routes import chat_bp
from .routes.health_routes import health_bp
from .utils.errors import register_error_handlers


def create_app(config_class=Config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app, resources={r"/api/*": {"origins": config_class.CORS_ORIGINS}})

    app.register_blueprint(health_bp)
    app.register_blueprint(chat_bp)

    register_error_handlers(app)

    return app
