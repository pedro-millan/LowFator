import os
import time
from datetime import datetime, timedelta

UPLOAD_DIR = "app/uploaded_audios"
MAX_AGE_HOURS = 3

def cleanup_old_files():
    now = datetime.now()
    max_age = timedelta(hours=MAX_AGE_HOURS)

    if not os.path.exists(UPLOAD_DIR):
        return

    for filename in os.listdir(UPLOAD_DIR):
        file_path = os.path.join(UPLOAD_DIR, filename)

        if not os.path.isfile(file_path):
            continue

        file_mtime = datetime.fromtimestamp(os.path.getmtime(file_path))

        if now - file_mtime > max_age:
            try:
                os.remove(file_path)
                print(f"🧹 Eliminado: {filename}")
            except Exception as e:
                print(f"Error borrando {filename}: {e}")