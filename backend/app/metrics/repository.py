from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.models import Metric
from app.metrics.definitions import CANONICAL_METRICS

class MetricRepository:
    """
    Centralized, version-controlled repository of standardized blockchain metrics for consistent comparative analysis.
    """

    @classmethod
    def get_all(cls, db: Session) -> List[Metric]:
        return db.query(Metric).all()

    @classmethod
    def get_by_metric_id(cls, db: Session, metric_id: str) -> Optional[Metric]:
        return db.query(Metric).filter(Metric.metric_id == metric_id).first()

    @classmethod
    def get_by_canonical_name(cls, db: Session, name: str) -> Optional[Metric]:
        return db.query(Metric).filter(Metric.canonical_name == name).first()
