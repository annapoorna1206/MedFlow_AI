from flask import Flask
from flask_cors import CORS

from config import SECRET_KEY
from models import create_tables
from routes import register_routes


def create_app():
    """
    Creates and configures the Flask application.
    """

    app = Flask(__name__)

    # Secret key for security/session management
    app.config["SECRET_KEY"] = SECRET_KEY

    # Allow React frontend to communicate with Flask
    CORS(app)

    # Create database tables
    create_tables()

    # Register all API routes
    register_routes(app)

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)