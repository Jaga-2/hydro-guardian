from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


def generate_pdf_report(summary: dict):
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=letter)
    pdf.setTitle('Hydro Guardian Report')
    pdf.setFont('Helvetica-Bold', 18)
    pdf.drawString(50, 750, 'Hydro Guardian Water Quality Report')
    pdf.setFont('Helvetica', 12)
    pdf.drawString(50, 720, f"Total Samples: {summary.get('total_samples', 0)}")
    pdf.drawString(50, 700, f"Safe Samples: {summary.get('safe_samples', 0)}")
    pdf.drawString(50, 680, f"Unsafe Samples: {summary.get('unsafe_samples', 0)}")
    pdf.drawString(50, 660, f"Accuracy: {summary.get('accuracy', 0)}%")
    pdf.save()
    buffer.seek(0)
    return buffer.getvalue()
