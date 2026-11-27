from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.models import Transaction
from app.schemas.schemas import TransactionSchema

router = APIRouter()

@router.get("", response_model=List[TransactionSchema])
def list_transactions(
    dataset_id: int = 1,
    search: Optional[str] = None,
    method: Optional[str] = None,
    sender: Optional[str] = None,
    receiver: Optional[str] = None,
    block: Optional[int] = None,
    min_value: Optional[float] = None,
    max_value: Optional[float] = None,
    limit: int = Query(50, le=200),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    q = db.query(Transaction).filter(Transaction.dataset_id == dataset_id)

    if search:
        search_term = f"%{search.strip()}%"
        q = q.filter(
            (Transaction.tx_hash.ilike(search_term)) |
            (Transaction.sender.ilike(search_term)) |
            (Transaction.receiver.ilike(search_term)) |
            (Transaction.method_name.ilike(search_term))
        )

    if method:
        q = q.filter(Transaction.method_name.ilike(f"%{method}%"))
    if sender:
        q = q.filter(Transaction.sender.ilike(f"%{sender}%"))
    if receiver:
        q = q.filter(Transaction.receiver.ilike(f"%{receiver}%"))
    if block:
        q = q.filter(Transaction.block_number == block)
    if min_value is not None:
        q = q.filter(Transaction.value >= min_value)
    if max_value is not None:
        q = q.filter(Transaction.value <= max_value)

    return q.order_by(Transaction.timestamp.desc()).offset(offset).limit(limit).all()
