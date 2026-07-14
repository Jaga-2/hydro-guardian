from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.user import User
from app.schemas.auth import RegisterRequest, LoginRequest, FirebaseSyncRequest, UserOut

router = APIRouter(prefix='/auth', tags=['auth'])


@router.post('/firebase-sync')
def sync_firebase_user(request: FirebaseSyncRequest, db: Session = Depends(get_db)):
    email = str(request.email).strip().lower()
    firebase_uid = request.firebase_uid.strip() if request.firebase_uid else None

    existing = db.query(User).filter(User.email == email).first()
    if not existing and firebase_uid:
        existing = db.query(User).filter(User.firebase_uid == firebase_uid).first()

    if not existing:
        existing = User(email=email, name='User', firebase_uid=firebase_uid)
        db.add(existing)
    else:
        if existing.email != email:
            existing.email = email
        if firebase_uid and not existing.firebase_uid:
            existing.firebase_uid = firebase_uid

    db.commit()
    db.refresh(existing)
    return {'message': 'User synced', 'user': {'id': existing.id, 'email': existing.email, 'firebase_uid': existing.firebase_uid}}


@router.post('/register')
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    email = str(request.email).strip().lower()
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail='User already exists')
    user = User(email=email, name='User')
    db.add(user)
    db.commit()
    db.refresh(user)
    return {'message': 'User registered', 'user': {'id': user.id, 'email': user.email}}


@router.post('/login')
def login(request: LoginRequest, db: Session = Depends(get_db)):
    email = str(request.email).strip().lower()
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    return {'message': 'Logged in', 'user': {'id': user.id, 'email': user.email}}
