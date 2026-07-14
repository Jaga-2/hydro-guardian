from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.connection import Base


class Prediction(Base):
    __tablename__ = 'predictions'

    id = Column(Integer, primary_key=True, index=True)
    upload_id = Column(Integer, ForeignKey('uploads.id'))
    result = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
