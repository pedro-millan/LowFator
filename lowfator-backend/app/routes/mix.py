from fastapi import APIRouter
from pydantic import BaseModel
import os
from app.audio.effects import apply_multiple_effects

router = APIRouter()

PROCESSED_DIR = "app/processed"
UPLOAD_DIR = "app/uploaded_audios"
os.makedirs(PROCESSED_DIR, exist_ok=True)

ACTIVE_AUDIO = os.path.join(UPLOAD_DIR, "current.wav")

class MixRequest(BaseModel):
    filters: list[str] = []

@router.post("/mix")
def mix_audio(payload: MixRequest):
    if not os.path.exists(ACTIVE_AUDIO):
        return {"error": "No hay audio subido. Sube un sample primero."}

    output_path = os.path.join(PROCESSED_DIR, "current_mix.wav")
    apply_multiple_effects(payload.filters, ACTIVE_AUDIO, output_path)

    return {
        "mix_filepath": "http://localhost:8000/processed/current_mix.wav"
    }
