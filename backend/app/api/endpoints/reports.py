from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import ReproducibilityReport, Analysis
from app.schemas.schemas import ReportSummarySchema
from app.reports.pdf_generator import generate_pdf_report

router = APIRouter()

@router.get("", response_model=List[ReportSummarySchema])
def list_reports(db: Session = Depends(get_db)):
    reports = db.query(ReproducibilityReport).order_by(ReproducibilityReport.created_at.desc()).all()
    results = []
    for r in reports:
        analysis = r.analysis
        results.append(ReportSummarySchema(
            report_id=r.report_id,
            analysis_id=r.analysis_id,
            title=r.title,
            author=r.author,
            query=analysis.original_query if analysis else "N/A",
            metric=analysis.metric.display_name if analysis and analysis.metric else "N/A",
            result=analysis.primary_result if analysis else 0.0,
            unit=analysis.result_unit if analysis else "ETH",
            validation_status=analysis.validation_status if analysis else "VERIFIED",
            reproducibility_status=analysis.reproducibility_status if analysis else "READY",
            created_at=r.created_at,
            reproduced_count=r.reproduced_count,
            last_reproduced_at=r.last_reproduced_at
        ))
    return results

@router.get("/{report_id}/pdf")
def download_pdf_report(report_id: str, db: Session = Depends(get_db)):
    report = db.query(ReproducibilityReport).filter(
        (ReproducibilityReport.report_id == report_id) | (ReproducibilityReport.analysis_id == report_id)
    ).first()
    if not report or not report.analysis:
        raise HTTPException(status_code=404, detail="Reproducibility report not found.")

    analysis = report.analysis
    metric = analysis.metric
    dataset = analysis.dataset

    pdf_bytes = generate_pdf_report(analysis, metric, dataset)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="ROCA_{report.report_id}_{analysis.analysis_id}.pdf"'
        }
    )
