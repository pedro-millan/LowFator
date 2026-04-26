from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import shutil

router = APIRouter()

UPLOAD_DIR = "app/uploaded_audios"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ACTIVE_AUDIO_PATH = os.path.join(UPLOAD_DIR, "current.wav")

ALLOWED_MIME_TYPES = {
    "audio/wav",
    "audio/x-wav",
    "audio/mpeg",
    "audio/mp3",
    "audio/aiff",
    "audio/x-aiff",
    "audio/ogg",
}

ALLOWED_EXTENSIONS = {
    ".wav",
    ".mp3",
    ".aiff",
    ".ogg",
}

@router.post("/upload")
async def upload_audio(file: UploadFile = File(...)):
    _, ext = os.path.splitext(file.filename.lower())

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Incorrect file extension. Allowed: wav, mp3, aiff, ogg"
        )

    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Incorrect file MIME type. Allowed: wav, mp3, aiff, ogg"
        )

    original_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(original_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    shutil.copy(original_path, ACTIVE_AUDIO_PATH)

    return {
        "message": "Audio subido correctamente",
        "filename": file.filename,
        "active_audio": "current.wav",
        "audio_url": "http://localhost:8000/uploaded_audios/current.wav"
    }