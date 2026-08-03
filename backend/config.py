import os

# Backend folder path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# SQLite database location
DATABASE_PATH = os.path.join(BASE_DIR, "instance", "medflow.db")

# Flask Secret Key
SECRET_KEY = "medflow_ai_secret_key"

# Machine Learning Model Path
MODEL_PATH = os.path.join(BASE_DIR, "..", "trained_models", "waiting_time_model.pkl")
