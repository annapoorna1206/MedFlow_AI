from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import os
from config import DATABASE_PATH

# Create the database folder if it doesn't exist
os.makedirs(os.path.dirname(DATABASE_PATH), exist_ok=True)

# SQLite database URL
DATABASE_URL = f"sqlite:///{DATABASE_PATH}"

# Create database engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Session for database operations
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for all database models
Base = declarative_base()