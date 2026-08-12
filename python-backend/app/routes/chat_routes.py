from flask import Blueprint

from ..controllers.chat_controller import post_chat

chat_bp = Blueprint("chat", __name__, url_prefix="/api")
chat_bp.add_url_rule("/chat", view_func=post_chat, methods=["POST"])
