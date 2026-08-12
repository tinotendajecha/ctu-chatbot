from flask import jsonify


def get_health():
    return jsonify({"status": "ok"})
