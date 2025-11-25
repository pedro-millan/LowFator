from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base


# ---------------------------------------------------------
# 1) USER'S UPLOADED AUDIO
# ---------------------------------------------------------
class AudioFile(Base):
    __tablename__ = "audio_files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(100), nullable=False)
    filepath = Column(String(255), nullable=False)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    duration = Column(Float)
    sample_rate = Column(Integer)
    format = Column(String(10))

    # MANY-TO-MANY 
    filters = relationship(
        "AudioFilter",
        back_populates="audio",
        cascade="all, delete-orphan"
    )

    # ONE-TO-MANY
    processed_versions = relationship(
        "ProcessedFile",
        back_populates="original",
        cascade="all, delete-orphan"
    )


# ---------------------------------------------------------
# 2) AVAILABLE FILTERS
# ---------------------------------------------------------
class Filter(Base):
    __tablename__ = "filters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    description = Column(String)
    slug = Column(String(50), unique=True)

    # Relación MANY-TO-MANY con audio_files
    audio_links = relationship(
        "AudioFilter",
        back_populates="filter",
        cascade="all, delete-orphan"
    )


# ---------------------------------------------------------
# 3) INTERMEDIATE TABLE MANY-TO-MANY: audio ↔ filters
# ---------------------------------------------------------
class AudioFilter(Base):
    __tablename__ = "audio_filters"

    id = Column(Integer, primary_key=True, index=True)
    audio_id = Column(Integer, ForeignKey("audio_files.id"))
    filter_id = Column(Integer, ForeignKey("filters.id"))

    # Relaciones para ORM
    audio = relationship("AudioFile", back_populates="filters")
    filter = relationship("Filter", back_populates="audio_links")


# ---------------------------------------------------------
# 4) PROCESSED AUDIOS
# ---------------------------------------------------------
class ProcessedFile(Base):
    __tablename__ = "processed_files"

    id = Column(Integer, primary_key=True, index=True)
    original_id = Column(Integer, ForeignKey("audio_files.id"))
    processed_filename = Column(String(100))
    processed_filepath = Column(String(255))
    processed_at = Column(DateTime, default=datetime.utcnow)
    format = Column(String(10))

    # Relación con audio original
    original = relationship("AudioFile", back_populates="processed_versions")

