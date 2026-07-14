# Hydro Guardian

Hydro Guardian is a full-stack AI-powered water quality prediction application built with React, Vite, FastAPI, PostgreSQL, Firebase Authentication, Recharts, Tailwind CSS, and Lucide React.

## Features
- Home page with water-themed hero section
- Firebase Authentication with Google and email/password
- CSV upload and water quality prediction
- Data table preview and result export
- Visualization charts for water parameters
- History tracking and report generation
- Admin dashboard views

## Folder Structure
- frontend/: React + Vite frontend
- backend/: FastAPI backend

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Database
Use PostgreSQL and set the DATABASE_URL environment variable:
```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/hydro_guardian"
```

## Firebase Setup
1. Create a Firebase project.
2. Enable Authentication and Google sign-in.
3. Replace the placeholder values in frontend/src/firebase/config.js.

## Notes
The app uses a simple rule-based prediction logic based on acceptable water quality ranges.
