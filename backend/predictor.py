from datetime import datetime, timedelta


class QueuePredictor:

    def __init__(
        self,
        consultation_time=10
    ):
        self.consultation_time = consultation_time

    def predict_wait_time(
        self,
        patients_ahead,
        emergency_cases=0,
        doctor_delay=0
    ):

        wait = (
            patients_ahead * self.consultation_time
            + emergency_cases * 8
            + doctor_delay
        )

        return max(wait, 0)

    def recommend_slot(
        self,
        waiting_patients
    ):

        recommended = datetime.now() + timedelta(
            minutes=waiting_patients * self.consultation_time
        )

        return {
            "recommended_time": recommended.strftime("%I:%M %p"),
            "estimated_wait": waiting_patients * self.consultation_time
        }


predictor = QueuePredictor()