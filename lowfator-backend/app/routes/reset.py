from fastapi import APIRouter
import os
import glob

router = APIRouter()

UPLOAD_DIR = "app/uploaded_audios"
TEMP_DIR = "app/temp"
PROCESSED_DIR = "app/processed"

def _safe_remove(path: str):
    try:
        if os.path.exists(path):
            os.remove(path)
    except:
        pass

@router.post("/reset")
def reset():
 
    _safe_remove(os.path.join(UPLOAD_DIR, "current.wav"))


    for f in glob.glob(os.path.join(TEMP_DIR, "preview_*.wav")):
        _safe_remove(f)


    _safe_remove(os.path.join(PROCESSED_DIR, "current_mix.wav"))

    return {"message": "Session reset OK"}
