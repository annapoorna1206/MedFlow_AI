from flask import request, jsonify
from sqlalchemy.exc import IntegrityError
from datetime import datetime

from database import SessionLocal
from models import Patient, Appointment
from ai import predict_wait_time

from ai_recommendation import recommend_slot

def register_routes(app):

    @app.route("/")
    def home():
        return "MedFlow AI Backend Running"

    @app.route("/api/test")
    def test():
        return jsonify({
            "message": "Backend Connected Successfully"
        })

    # ----------------------------
    # Register
    # ----------------------------
    @app.route("/register", methods=["POST"])
    def register():

        data = request.get_json()

        db = SessionLocal()

        try:

            patient = Patient(
                full_name=data["full_name"],
                age=data["age"],
                gender=data["gender"],
                phone=data["phone"],
                email=data["email"],
                password=data["password"]
            )

            db.add(patient)
            db.commit()

            return jsonify({
                "message": "Patient Registered Successfully"
            })

        except IntegrityError:

            db.rollback()

            return jsonify({
                "error": "Email or Phone already exists"
            }), 400

        finally:
            db.close()

    # ----------------------------
    # Login
    # ----------------------------
    @app.route("/login", methods=["POST"])
    def login():

        data = request.get_json()

        db = SessionLocal()

        patient = db.query(Patient).filter(
            Patient.email == data["email"],
            Patient.password == data["password"]
        ).first()

        db.close()

        if patient:

            return jsonify({
                "message": "Login Successful",
                "patient_id": patient.id,
                "patient_name": patient.full_name
            })

        return jsonify({
            "error": "Invalid Email or Password"
        }), 401

    # ----------------------------
    # Appointment Booking
    # ----------------------------
    @app.route("/appointment", methods=["POST"])
    def appointment():

        data = request.get_json()

        db = SessionLocal()

        last = db.query(Appointment).order_by(
            Appointment.token_number.desc()
        ).first()

        token = 1 if last is None else last.token_number + 1

        emergency = data.get("emergency", False)

        if emergency:
            token = 0

        appointment = Appointment(
            patient_id=data["patient_id"],
            doctor_id=data["doctor_id"],
            appointment_time=datetime.strptime(
                data["date"],
                "%Y-%m-%d"
            ),
            token_number=token,
            status="Waiting",
            emergency=emergency
        )

        db.add(appointment)
        db.commit()

        db.close()

        return jsonify({
            "message": "Appointment Booked Successfully",
            "token": token
        })

    # ----------------------------
    # Queue
    # ----------------------------
    @app.route("/queue")
    def queue():
        patient_id = int(request.args.get("patient_id"))
        db = SessionLocal()
        appointment = (
            db.query(Appointment)
            .filter(Appointment.patient_id == patient_id)
            .order_by(Appointment.id.desc())
            .first()
        )

        if not appointment:

            db.close()

            return jsonify({
                "error": "No Appointment Found"
            }), 404

        ahead = max(0, appointment.token_number - 1)

        wait = predict_wait_time(
            patients_ahead=ahead,
            consultation_time=10,
            emergency_cases=0,
            doctor_delay=0
        )

        db.close()

        return jsonify({
            "token": appointment.token_number,
            "ahead": ahead,
            "wait_time": wait
        })


    # ----------------------------
    # AI Appointment Recommendation
    # ----------------------------
    @app.route("/recommend-slot")
    def recommend():

        db = SessionLocal()

        waiting = db.query(Appointment).filter(
            Appointment.status == "Waiting"
        ).count()

        result = recommend_slot(waiting)

        db.close()

        return jsonify(result)
    
    # ----------------------------
    # History
    # ----------------------------
    @app.route("/history")
    def history():
        patient_id = int(request.args.get("patient_id"))
        db = SessionLocal()
        appointments = (
            db.query(Appointment)
            .filter(Appointment.patient_id == patient_id)
            .all()
        )

        data = []

        for a in appointments:

            doctor = f"Doctor {a.doctor_id}" if a.doctor_id else "Not Assigned"

            data.append({
                "id": a.id,
                "token": a.token_number,
                "doctor": doctor,
                "status": a.status,
                "date": a.appointment_time.strftime("%d-%m-%Y")
            })

        db.close()

        return jsonify(data)

    # ----------------------------
    # Profile
    # ----------------------------
    @app.route("/profile")
    def profile():
        patient_id = int(request.args.get("patient_id"))
        db = SessionLocal()

        patient = (
            db.query(Patient)
            .filter(Patient.id == patient_id)
            .first()
        )

        if patient is None:

            db.close()

            return jsonify({
                "error": "No Patient Found"
            })

        result = {
            "full_name": patient.full_name,
            "age": patient.age,
            "gender": patient.gender,
            "phone": patient.phone,
            "email": patient.email
        }

        db.close()

        return jsonify(result)

    # ----------------------------
    # Doctor Dashboard
    # ----------------------------
    @app.route("/doctor/dashboard")
    def doctor_dashboard():

        db = SessionLocal()

        appointments = (
            db.query(Appointment)
            .order_by(
                Appointment.emergency.desc(),
                Appointment.token_number
            )
            .all()
        )

        result = []

        for a in appointments:

            patient = (
                db.query(Patient)
                .filter(Patient.id == a.patient_id)
                .first()
            )

            result.append({
                "id": a.id,
                "token": a.token_number,
                "patient": patient.full_name if patient else "Unknown",
                "status": a.status,
                "emergency": a.emergency
            })

        db.close()

        return jsonify(result)
    # ----------------------------
    # Call Next Patient
    # ----------------------------
    @app.route("/doctor/call-next", methods=["POST"])
    def call_next():

        db = SessionLocal()

        appointment = (
            db.query(Appointment)
            .filter(Appointment.status == "Waiting")
            .order_by(
                Appointment.emergency.desc(),
                Appointment.token_number
            )
            .first()
        )

        if appointment is None:

            db.close()

            return jsonify({
                "message": "No patients waiting"
            })

        appointment.status = "In Consultation"

        db.commit()

        message = f"Calling Token {appointment.token_number}"

        db.close()

        return jsonify({
            "message": message
        })


    # ----------------------------
    # Complete Consultation
    # ----------------------------
    @app.route("/doctor/complete", methods=["POST"])
    def complete_consultation():

        db = SessionLocal()

        appointment = (
            db.query(Appointment)
            .filter(Appointment.status == "In Consultation")
            .first()
        )

        if appointment is None:

            db.close()

            return jsonify({
                "message": "No patient in consultation"
            })

        appointment.status = "Completed"

        db.commit()

        db.close()

        return jsonify({
            "message": "Consultation Completed Successfully"
        })

    # ----------------------------
    # Admin Dashboard
    # ----------------------------
    @app.route("/admin/dashboard")
    def admin():

        db = SessionLocal()

        total_patients = db.query(Patient).count()

        total_appointments = db.query(Appointment).count()

        waiting = db.query(Appointment).filter(
            Appointment.status == "Waiting"
        ).count()

        completed = db.query(Appointment).filter(
            Appointment.status == "Completed"
        ).count()

        db.close()

        return jsonify({

            "total_patients": total_patients,
            "total_appointments": total_appointments,
            "waiting_patients": waiting,
            "completed_patients": completed

        })