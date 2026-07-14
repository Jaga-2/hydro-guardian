import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://neondb_owner:npg_QrfhZNR46bXd@ep-mute-firefly-atyq23g5-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require')
engine = create_engine(DATABASE_URL, connect_args={'check_same_thread': False} if DATABASE_URL.startswith('sqlite') else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def ensure_database_schema():
    inspector = inspect(engine)
    if 'users' not in inspector.get_table_names():
        Base.metadata.create_all(bind=engine)
        return

    columns = {column['name'] for column in inspector.get_columns('users')}
    if 'firebase_uid' not in columns:
        with engine.begin() as connection:
            connection.execute(text('ALTER TABLE users ADD COLUMN firebase_uid VARCHAR'))
            connection.execute(text('CREATE UNIQUE INDEX IF NOT EXISTS ix_users_firebase_uid ON users (firebase_uid)'))

    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
