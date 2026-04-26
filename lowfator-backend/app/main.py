from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import asyncio

from app.utils.cleanup import cleanup_old_files
from app.routes import preview, upload, mix, reset, export, contact

async def cleanup_loop():
    while True:
        cleanup_old_files()
        await asyncio.sleep(3600)  # cada 60 minutos

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def start_cleanup():
    app.state.cleanup_task = asyncio.create_task(cleanup_loop())

TEMP_DIR = "app/temp"
UPLOAD_DIR = "app/uploaded_audios"
PROCESSED_DIR = "app/processed"

os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

app.include_router(upload.router)
app.include_router(reset.router)
app.include_router(preview.router)
app.include_router(mix.router)
app.include_router(export.router)
app.include_router(contact.router)

app.mount("/temp", StaticFiles(directory=TEMP_DIR), name="temp")
app.mount("/uploaded_audios", StaticFiles(directory=UPLOAD_DIR), name="uploaded_audios")
app.mount("/processed", StaticFiles(directory=PROCESSED_DIR), name="processed")


