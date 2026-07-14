from typing import Optional

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.prediction import Prediction
from app.models.upload import Upload
from app.models.user import User
from app.schemas.analysis import AnalysisResponse
from app.services.prediction import predict_rows

router = APIRouter(prefix='/analysis', tags=['analysis'])


@router.post('/upload', response_model=AnalysisResponse)
async def upload_csv(
    file: UploadFile = File(...),
    user_email: Optional[str] = Form(default=None),
    firebase_uid: Optional[str] = Form(default=None),
    db: Session = Depends(get_db),
):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail='Only CSV files are supported')

    if not user_email and not firebase_uid:
        raise HTTPException(status_code=401, detail='Authentication required. Please sign in before uploading a CSV.')

    normalized_email = str(user_email).strip().lower() if user_email else None
    user = None

    if normalized_email:
        user = db.query(User).filter(User.email == normalized_email).first()

    if not user and firebase_uid:
        user = db.query(User).filter(User.firebase_uid == firebase_uid).first()

    if not user:
        raise HTTPException(status_code=401, detail='User not found in database. Please sign in again and try uploading.')

    contents = await file.read()
    rows = predict_rows(contents)

    upload = Upload(user_id=user.id, file_name=file.filename)
    db.add(upload)
    db.commit()
    db.refresh(upload)

    for row in rows:
        result = row.get('Prediction', 'Unsafe')
        db.add(Prediction(upload_id=upload.id, result=result))

    db.commit()

    return AnalysisResponse(message='Analysis complete', rows=rows)


@router.get('/history')
def get_history(db: Session = Depends(get_db)):
    uploads = db.query(Upload).all()
    return {'history': [{'id': item.id, 'file_name': item.file_name, 'upload_date': str(item.upload_date)} for item in uploads]}
