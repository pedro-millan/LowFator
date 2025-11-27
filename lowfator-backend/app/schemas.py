from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


# ---------------------------------------------------------
# 1) FILTERS
# ---------------------------------------------------------
class FilterBase(BaseModel):
    id: int
    name: str
    slug: str

    class Config:
        orm_mode = True


# ---------------------------------------------------------
# 2) AUDIO FILE UPLOADED BY USER
# ---------------------------------------------------------
class AudioFileBase(BaseModel):
    id: int
    filename: str
    filepath: str
    uploaded_at: datetime
    duration: Optional[float]
    sample_rate: Optional[int]
    format: str

    class Config:
        orm_mode = True


class AudioFileWithFilters(AudioFileBase):
    filters: List[FilterBase] = []


# ---------------------------------------------------------
# 3) PROCESSED FILE (after applying filters)
# ---------------------------------------------------------
class ProcessedFileBase(BaseModel):
    id: int
    processed_filename: str
    processed_filepath: str
    processed_at: datetime
    format: str

    class Config:
        orm_mode = True


# ---------------------------------------------------------
# 4) REQUEST SCHEMAS
# ---------------------------------------------------------
class PreviewRequest(BaseModel):
    filter_slug: str


class ProcessRequest(BaseModel):
    filters: List[str]  # lista de slugs
    output_format: str  # wav, mp3 o aiff


# ---------------------------------------------------------
# 5) RESPONSE SCHEMAS
# ---------------------------------------------------------
class UploadResponse(BaseModel):
    id: int
    filename: str
    format: str
    duration: Optional[float]

    class Config:
        orm_mode = True


class PreviewResponse(BaseModel):
    preview_filepath: str
    applied_filter: str


class ProcessResponse(BaseModel):
    processed_id: int
    processed_filepath: str
    format: str
    filters_applied: List[str]
