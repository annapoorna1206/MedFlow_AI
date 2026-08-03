from datetime import datetime, timedelta


def recommend_slot(current_patients):

    now = datetime.now()

    consultation_time = 10

    recommended = now + timedelta(
        minutes=current_patients * consultation_time
    )

    return {
        "recommended_time": recommended.strftime("%I:%M %p"),
        "estimated_wait": current_patients * consultation_time
    }