from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import os
from app.routes import preview
from app.routes import upload
from app.routes import mix
from app.routes import reset


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


TEMP_DIR = "app/temp"
os.makedirs(TEMP_DIR, exist_ok=True)

app.include_router(upload.router)
app.include_router(reset.router)
app.mount("/temp", StaticFiles(directory="app/temp"), name="temp")
app.include_router(preview.router)
app.mount("/uploaded_audios", StaticFiles(directory="app/uploaded_audios"), name="uploaded_audios")
app.mount("/processed", StaticFiles(directory="app/processed"), name="processed")
app.include_router(mix.router)

UPLOAD_DIR = "uploaded_audios"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload-audio")
async def upload_audio(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"filename": file.filename, "message": "Audio subido correctamente"}
