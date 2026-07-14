from fastapi import APIRouter
from fastapi.responses import Response
from app.services.reports import generate_pdf_report

router = APIRouter(prefix='/reports', tags=['reports'])


@router.get('/download')
def download_report():
    summary = {
        'total_samples': 120,
        'safe_samples': 84,
        'unsafe_samples': 36,
        'accuracy': 98.7,
    }
    pdf_bytes = generate_pdf_report(summary)
    return Response(content=pdf_bytes, media_type='application/pdf', headers={'Content-Disposition': 'attachment; filename=hydro-guardian-report.pdf'})
