from app.database import engine
from sqlalchemy import text

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("✅ Conexión exitosa:", result.scalar())
except Exception as e:
    print("❌ Error al conectar con la base de datos:")
    print(e)
