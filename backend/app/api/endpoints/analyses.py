import time
import json
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Analysis, Metric, Dataset, ReproducibilityReport
from app.schemas.schemas import AnalysisRequest, AnalysisResponse, ReproductionResponse
from app.semantic.engine import SemanticRuleEngine
from app.query_gen.generator import QueryGenerator
from app.validation.engine import ValidationEngine

router = APIRouter()

@router.post("", response_model=AnalysisResponse)
def execute_analysis(request: AnalysisRequest, db: Session = Depends(get_db)):
    start_time = time.time()

    # 1. Dataset lookup
    dataset = db.query(Dataset).filter(Dataset.id == request.dataset_id).first()
    if not dataset:
        dataset = db.query(Dataset).first()
        if not dataset:
            raise HTTPException(status_code=404, detail="No active blockchain dataset available.")

    # 2. Semantic resolution
    resolved = SemanticRuleEngine.resolve_query(db, request.query)
    if not resolved.get("is_supported") or resolved.get("canonical_metric_id") == "UNKNOWN":
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Sorry, this metric query is not currently supported.",
                "suggestions": resolved.get("suggestions", [])
            }
        )

    # 3. Metric lookup
    metric = db.query(Metric).filter(Metric.metric_id == resolved["canonical_metric_id"]).first()
    if not metric:
        raise HTTPException(status_code=404, detail=f"Canonical Metric {resolved['canonical_metric_id']} not found in repository.")

    # 4. Secure Query Generation
    query_bundle = QueryGenerator.generate(
        metric=metric,
        dataset_id=dataset.id,
        time_days=resolved["entities"].get("time_days"),
        chain=resolved["entities"].get("entity_chain", "Ethereum")
    )

    # 5. Execution & Dual-Engine Validation
    validation_bundle = ValidationEngine.execute_and_validate(
        db=db,
        metric=metric,
        dataset=dataset,
        executable_sql=query_bundle["executable_sql"],
        sql_params=query_bundle["params"],
        original_query=request.query
    )

    execution_time = (time.time() - start_time) * 1000

    # 6. Generate sequential Analysis ID
    count = db.query(Analysis).count() + 1
    analysis_id = f"ROCA-AN-{count:06d}"
    report_id = f"REP-{count:04d}-AX"

    analysis_record = Analysis(
        analysis_id=analysis_id,
        original_query=request.query,
        parsed_intent=resolved["intent"],
        extracted_entities=json.dumps(resolved["entities"]),
        canonical_metric_id=metric.metric_id,
        dataset_id=dataset.id,
        generated_sql=query_bundle["standard_sql"],
        generated_web3=query_bundle["web3_python"],
        primary_result=validation_bundle["primary_result"],
        result_unit=metric.unit,
        independent_result=validation_bundle["independent_result"],
        discrepancy=validation_bundle["difference"],
        tolerance=validation_bundle["tolerance"],
        validation_status=validation_bundle["validation_status"],
        reproducibility_status=validation_bundle["reproducibility_status"],
        reproducibility_hash=validation_bundle["reproducibility_hash"],
        execution_time_ms=round(execution_time, 2)
    )
    db.add(analysis_record)
    db.commit()

    # Create associated Reproducibility Report
    report = ReproducibilityReport(
        report_id=report_id,
        analysis_id=analysis_id,
        title=f"Reproducibility Report: {metric.display_name} Analysis",
        author="Dr. E. Vance, ROCA Research Lab",
        payload_snapshot=validation_bundle["serialized_payload"],
        reproduced_count=0
    )
    db.add(report)
    db.commit()

    return AnalysisResponse(
        analysis_id=analysis_id,
        query=request.query,
        parsed_intent=resolved["intent"],
        metric_id=metric.metric_id,
        metric=metric.display_name,
        metric_version=metric.version,
        dataset_name=dataset.name,
        dataset_version=dataset.version,
        generated_sql=query_bundle["standard_sql"],
        generated_web3=query_bundle["web3_python"],
        result=validation_bundle["primary_result"],
        unit=metric.unit,
        independent_result=validation_bundle["independent_result"],
        difference=validation_bundle["difference"],
        tolerance=validation_bundle["tolerance"],
        validation_status=validation_bundle["validation_status"],
        reproducibility_status=validation_bundle["reproducibility_status"],
        reproducibility_hash=validation_bundle["reproducibility_hash"],
        execution_time_ms=round(execution_time, 2),
        timestamp=analysis_record.created_at,
        entities=resolved["entities"],
        report_id=report_id
    )

@router.get("/{analysis_id}", response_model=AnalysisResponse)
def get_analysis_by_id(analysis_id: str, db: Session = Depends(get_db)):
    analysis = db.query(Analysis).filter(Analysis.analysis_id == analysis_id).first()
    if not analysis:
        # Also check if it's a report_id like REP-8492-AX
        report = db.query(ReproducibilityReport).filter(ReproducibilityReport.report_id == analysis_id).first()
        if report:
            analysis = report.analysis

    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis record not found.")

    metric = analysis.metric
    dataset = analysis.dataset
    report = db.query(ReproducibilityReport).filter(ReproducibilityReport.analysis_id == analysis.analysis_id).first()

    return AnalysisResponse(
        analysis_id=analysis.analysis_id,
        query=analysis.original_query,
        parsed_intent=analysis.parsed_intent,
        metric_id=metric.metric_id,
        metric=metric.display_name,
        metric_version=metric.version,
        dataset_name=dataset.name,
        dataset_version=dataset.version,
        generated_sql=analysis.generated_sql,
        generated_web3=analysis.generated_web3,
        result=analysis.primary_result,
        unit=analysis.result_unit,
        independent_result=analysis.independent_result,
        difference=analysis.discrepancy,
        tolerance=analysis.tolerance,
        validation_status=analysis.validation_status,
        reproducibility_status=analysis.reproducibility_status,
        reproducibility_hash=analysis.reproducibility_hash,
        execution_time_ms=analysis.execution_time_ms,
        timestamp=analysis.created_at,
        entities=json.loads(analysis.extracted_entities) if analysis.extracted_entities else None,
        report_id=report.report_id if report else None
    )

@router.post("/{analysis_id}/reproduce", response_model=ReproductionResponse)
def reproduce_analysis(analysis_id: str, db: Session = Depends(get_db)):
    analysis = db.query(Analysis).filter(Analysis.analysis_id == analysis_id).first()
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis record not found.")

    metric = analysis.metric
    dataset = analysis.dataset
    report = db.query(ReproducibilityReport).filter(ReproducibilityReport.analysis_id == analysis_id).first()

    # Re-execute query generator and validation against current database state
    query_bundle = QueryGenerator.generate(
        metric=metric,
        dataset_id=dataset.id
    )

    validation_bundle = ValidationEngine.execute_and_validate(
        db=db,
        metric=metric,
        dataset=dataset,
        executable_sql=query_bundle["executable_sql"],
        sql_params=query_bundle["params"],
        original_query=analysis.original_query
    )

    reproduced_val = validation_bundle["primary_result"]
    original_val = analysis.primary_result
    diff = abs(reproduced_val - original_val)
    is_match = diff <= analysis.tolerance
    repro_status = "SUCCESSFULLY REPRODUCED" if is_match else "REPRODUCTION MISMATCH"

    # Update report metrics
    if report:
        report.reproduced_count += 1
        report.last_reproduced_at = datetime.now(timezone.utc)
        report.last_reproduction_status = repro_status
        db.commit()

    return ReproductionResponse(
        analysis_id=analysis.analysis_id,
        report_id=report.report_id if report else "REP-0001-AX",
        original_result=original_val,
        reproduced_result=reproduced_val,
        unit=analysis.result_unit,
        difference=diff,
        reproduction_status=repro_status,
        reproduced_at=datetime.now(timezone.utc),
        is_match=is_match,
        reproducibility_hash=validation_bundle["reproducibility_hash"]
    )
