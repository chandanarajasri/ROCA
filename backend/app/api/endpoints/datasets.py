from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import Dataset
from app.schemas.schemas import DatasetSchema

router = APIRouter()

@router.get("", response_model=List[DatasetSchema])
def list_datasets(db: Session = Depends(get_db)):
    return db.query(Dataset).all()

@router.get("/{dataset_id}", response_model=DatasetSchema)
def get_dataset(dataset_id: int, db: Session = Depends(get_db)):
    dataset = db.query(Dataset).filter(Dataset.id == dataset_id).first()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found.")
    return dataset
