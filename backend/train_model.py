import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib
import os

# Generate synthetic training data
np.random.seed(42)

rows = 1000

patients_ahead = np.random.randint(0, 30, rows)
consultation_time = np.random.randint(5, 16, rows)
emergency_cases = np.random.randint(0, 4, rows)
doctor_delay = np.random.randint(0, 21, rows)

wait_time = (
    patients_ahead * consultation_time
    + emergency_cases * 15
    + doctor_delay
    + np.random.randint(-5, 6, rows)
)

data = pd.DataFrame({
    "patients_ahead": patients_ahead,
    "consultation_time": consultation_time,
    "emergency_cases": emergency_cases,
    "doctor_delay": doctor_delay,
    "wait_time": wait_time
})

X = data[[
    "patients_ahead",
    "consultation_time",
    "emergency_cases",
    "doctor_delay"
]]

y = data["wait_time"]

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

model.fit(X, y)

os.makedirs("../trained_models", exist_ok=True)

joblib.dump(
    model,
    "../trained_models/waiting_time_model.pkl"
)

print("Model Trained Successfully!")
print("Saved to trained_models/waiting_time_model.pkl")