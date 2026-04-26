from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import FileResponse
import os
import subprocess

router = APIRouter()

PROCESSED_DIR = "app/processed"
SOURCE_WAV = os.path.join(PROCESSED_DIR, "current_mix.wav")
EXPORT_MP3 = os.path.join(PROCESSED_DIR, "current_mix.mp3")


@router.get("/export")
def export_mix(format: str = Query(..., pattern="^(wav|mp3)$")):
    if not os.path.exists(SOURCE_WAV):
        raise HTTPException(status_code=404, detail="No processed mix available")

    if format == "wav":
        return FileResponse(
            path=SOURCE_WAV,
            media_type="audio/wav",
            filename="lowfator_mix.wav"
        )

    if format == "mp3":
        try:
            subprocess.run(
                [
                    "ffmpeg",
                    "-y",
                    "-i", SOURCE_WAV,
                    "-codec:a", "libmp3lame",
                    "-b:a", "320k",
                    EXPORT_MP3
                ],
                check=True,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
        except subprocess.CalledProcessError:
            raise HTTPException(status_code=500, detail="Error converting WAV to MP3")

        return FileResponse(
            path=EXPORT_MP3,
            media_type="audio/mpeg",
            filename="lowfator_mix.mp3"
        )

    raise HTTPException(status_code=400, detail="Invalid format")