from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import Metric
from app.schemas.schemas import MetricSchema, MetricCreate

router = APIRouter()

@router.get("", response_model=List[MetricSchema])
def list_metrics(db: Session = Depends(get_db)):
    return db.query(Metric).order_by(Metric.id.asc()).all()

@router.get("/{metric_id}", response_model=MetricSchema)
def get_metric(metric_id: str, db: Session = Depends(get_db)):
    metric = db.query(Metric).filter(
        (Metric.metric_id == metric_id) | (Metric.canonical_name == metric_id)
    ).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Metric not found.")
    return metric

@router.post("", response_model=MetricSchema)
def create_metric(payload: MetricCreate, db: Session = Depends(get_db)):
    existing = db.query(Metric).filter(Metric.metric_id == payload.metric_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Metric with this ID already exists.")
    
    metric = Metric(**payload.model_dump())
    db.add(metric)
    db.commit()
    db.refresh(metric)
    return metric
