from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.schemas import QueryParseRequest, QueryParseResponse, QueryGenerateRequest, QueryGenerateResponse, ExtractedEntities
from app.semantic.engine import SemanticRuleEngine
from app.models.models import Metric, Dataset
from app.query_gen.generator import QueryGenerator

router = APIRouter()

@router.post("/parse", response_model=QueryParseResponse)
def parse_natural_query(request: QueryParseRequest, db: Session = Depends(get_db)):
    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Query string cannot be empty.")

    resolved = SemanticRuleEngine.resolve_query(db, request.query)
    entities = ExtractedEntities(**resolved.get("entities", {}))

    return QueryParseResponse(
        original_query=resolved["original_query"],
        intent=resolved["intent"],
        canonical_metric_id=resolved["canonical_metric_id"],
        metric_name=resolved["metric_name"],
        confidence=resolved["confidence"],
        entities=entities,
        explanation_steps=resolved["explanation_steps"],
        is_supported=resolved["is_supported"],
        suggestions=resolved.get("suggestions", [])
    )

@router.post("/generate", response_model=QueryGenerateResponse)
def generate_sql_and_web3(request: QueryGenerateRequest, db: Session = Depends(get_db)):
    metric = db.query(Metric).filter(Metric.metric_id == request.metric_id).first()
    if not metric:
        metric = db.query(Metric).filter(Metric.canonical_name == request.metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail=f"Metric '{request.metric_id}' not found.")

    dataset = db.query(Dataset).filter(Dataset.id == request.dataset_id).first()
    start_block = dataset.block_start if dataset else 18492000
    end_block = dataset.block_end if dataset else 18492105

    bundle = QueryGenerator.generate(
        metric=metric,
        dataset_id=request.dataset_id or 1,
        time_days=request.time_days,
        chain=request.chain or "Ethereum",
        status_filter=request.status_filter or "SUCCESS",
        start_block=start_block,
        end_block=end_block
    )

    return QueryGenerateResponse(
        metric_id=metric.metric_id,
        metric_name=metric.display_name,
        formal_definition=metric.formal_definition,
        standard_sql=bundle["standard_sql"],
        web3_python=bundle["web3_python"],
        required_columns=[c.strip() for c in metric.required_columns.split(",")],
        ast_summary=bundle["ast_summary"]
    )
