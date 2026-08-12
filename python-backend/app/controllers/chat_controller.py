from flask import jsonify, request

from ..services.rag_service import rag_service
from ..utils.errors import ApiError


def post_chat():
    payload = request.get_json(silent=True) or {}
    message = (payload.get("message") or "").strip()

    if not message:
        raise ApiError("`message` is required", status_code=400)

    reply = rag_service.answer(message)
    return jsonify(reply.to_dict())
