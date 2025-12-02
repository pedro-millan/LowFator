from fastapi import APIRouter, Query
from fastapi.responses import FileResponse
import shutil
import os

router = APIRouter()

TEMP_DIR = "app/temp"

@router.get("/preview")
def preview(filter: str = Query(...)):

    test_audio = os.path.join(TEMP_DIR, "test.wav")

    if not os.path.exists(test_audio):
        return {"error": "test.wav no existe en /app/temp"}

    output_path = os.path.join(TEMP_DIR, f"preview_{filter}.wav")
    shutil.copy(test_audio, output_path)

    return {
        "preview_filepath": f"http://localhost:8000/temp/preview_{filter}.wav"
    }
