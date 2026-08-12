from flask import Blueprint

from ..controllers.health_controller import get_health

health_bp = Blueprint("health", __name__, url_prefix="/api")
health_bp.add_url_rule("/health", view_func=get_health, methods=["GET"])
