import joblib
import os
import pandas as pd

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "trained_models",
    "waiting_time_model.pkl"
)

model = joblib.load(MODEL_PATH)


def predict_wait_time(
    patients_ahead,
    consultation_time=10,
    emergency_cases=0,
    doctor_delay=0
):

    data = pd.DataFrame([{
        "patients_ahead": patients_ahead,
        "consultation_time": consultation_time,
        "emergency_cases": emergency_cases,
        "doctor_delay": doctor_delay
    }])

    prediction = model.predict(data)[0]

    return round(prediction)