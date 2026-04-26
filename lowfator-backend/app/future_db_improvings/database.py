from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Datos de conexión a MariaDB
USER = "lowfator_admin"
PASSWORD = "0000"
HOST = "localhost"
PORT = "3306"
DB_NAME = "lowfator_db"

# URL de conexión para MariaDB usando pymysql como driver
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}"

# Crear el engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Crear el SessionLocal para interactuar con la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para declarar modelos
Base = declarative_base()

# Dependency para inyección en los endpoints

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
