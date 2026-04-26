from fastapi import APIRouter, Query
import os
from app.audio.effects import apply_effect

router = APIRouter()

TEMP_DIR = "app/temp"
UPLOAD_DIR = "app/uploaded_audios"
os.makedirs(TEMP_DIR, exist_ok=True)

ACTIVE_AUDIO = os.path.join(UPLOAD_DIR, "current.wav")

@router.get("/preview")
def preview(filter: str = Query(...)):
    if not os.path.exists(ACTIVE_AUDIO):
        return {"error": "No hay audio subido. Sube un sample primero."}

    output_path = os.path.join(TEMP_DIR, f"preview_{filter}.wav")
    apply_effect(filter, ACTIVE_AUDIO, output_path)

    return {
        "preview_filepath": f"http://localhost:8000/temp/preview_{filter}.wav"
    }
