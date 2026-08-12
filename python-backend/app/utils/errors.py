from flask import Flask, jsonify


class ApiError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        super().__init__(message)
        self.message = message
        self.status_code = status_code


def register_error_handlers(app: Flask) -> None:
    @app.errorhandler(ApiError)
    def handle_api_error(error: ApiError):
        return jsonify({"error": error.message}), error.status_code

    @app.errorhandler(RuntimeError)
    def handle_runtime_error(error: RuntimeError):
        # e.g. missing API keys / uninitialized vector index -- a config problem,
        # not a client error, so 503 rather than 500.
        return jsonify({"error": str(error)}), 503

    @app.errorhandler(Exception)
    def handle_unexpected_error(error: Exception):
        app.logger.exception("Unhandled error")
        return jsonify({"error": "Something went wrong processing your request."}), 500
