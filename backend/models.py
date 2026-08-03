from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base, engine


# -------------------------
# Patient Table
# -------------------------
class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    age = Column(Integer)
    gender = Column(String(20))
    phone = Column(String(20), unique=True)
    email = Column(String(100), unique=True)
    password = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)


# -------------------------
# Doctor Table
# -------------------------
class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    department = Column(String(100))
    consultation_time = Column(Float, default=10)
    availability = Column(String(50), default="Available")


# -------------------------
# Appointment Table
# -------------------------
class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True)

    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))

    appointment_time = Column(DateTime)

    token_number = Column(Integer)

    status = Column(String(50), default="Waiting")

    emergency = Column(Boolean, default=False)

    patient = relationship("Patient")
    doctor = relationship("Doctor")


# -------------------------
# Create Tables
# -------------------------
def create_tables():
    Base.metadata.create_all(bind=engine)