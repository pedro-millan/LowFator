from fastapi import APIRouter, UploadFile, File
import os
import shutil

router = APIRouter()

UPLOAD_DIR = "app/uploaded_audios"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ACTIVE_AUDIO_PATH = os.path.join(UPLOAD_DIR, "current.wav")

@router.post("/upload")
async def upload_audio(file: UploadFile = File(...)):

    original_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(original_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    shutil.copy(original_path, ACTIVE_AUDIO_PATH)

    return {
        "message": "Audio subido correctamente",
        "original_filename": file.filename,
        "active_audio": "current.wav",
        "audio_url": "http://localhost:8000/uploaded_audios/current.wav"
    }
