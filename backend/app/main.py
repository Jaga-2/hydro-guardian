from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import ensure_database_schema
from app.routers import auth, analysis, reports

app = FastAPI(title='Hydro Guardian API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

ensure_database_schema()

app.include_router(auth.router)
app.include_router(analysis.router)
app.include_router(reports.router)

@app.get('/')
def health_check():
    return {'message': 'Hydro Guardian API is running'}
