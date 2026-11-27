from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.models import SemanticRule
from app.schemas.schemas import SemanticRuleSchema, SemanticRuleCreate

router = APIRouter()

@router.get("", response_model=List[SemanticRuleSchema])
def list_semantic_rules(db: Session = Depends(get_db)):
    return db.query(SemanticRule).order_by(SemanticRule.confidence_score.desc()).all()

@router.post("", response_model=SemanticRuleSchema)
def create_semantic_rule(payload: SemanticRuleCreate, db: Session = Depends(get_db)):
    existing = db.query(SemanticRule).filter(SemanticRule.rule_id == payload.rule_id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Rule with this ID already exists.")
    
    rule = SemanticRule(**payload.model_dump())
    db.add(rule)
    db.commit()
    db.refresh(rule)
    return rule

@router.put("/{rule_id}/toggle")
def toggle_rule(rule_id: str, db: Session = Depends(get_db)):
    rule = db.query(SemanticRule).filter(SemanticRule.rule_id == rule_id).first()
    if not rule:
        raise HTTPException(status_code=404, detail="Semantic rule not found.")
    rule.is_active = not rule.is_active
    db.commit()
    return {"rule_id": rule.rule_id, "is_active": rule.is_active}
