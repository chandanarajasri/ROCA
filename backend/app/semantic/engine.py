from typing import Dict, Any, List, Optional
from sqlalchemy.orm import Session
from app.models.models import SemanticRule, Metric
from app.semantic.parser import QueryParser

class SemanticRuleEngine:
    """
    Semantic Rule Engine that bridges natural language queries to formally registered canonical metrics.
    Visualizes transformation pathways:
    User Intent -> NLP Interpretation -> Semantic Entity -> Formal Metric
    """

    @classmethod
    def resolve_query(cls, db: Session, query: str) -> Dict[str, Any]:
        # 1. Base parsing
        parsed = QueryParser.parse(query)

        # 2. Check dynamic database rules for exact pattern or alias matches
        cleaned_query = query.strip().lower()
        active_rules = db.query(SemanticRule).filter(SemanticRule.is_active == True).all()

        matched_rule = None
        for rule in active_rules:
            # Check comma-separated phrases in rule
            patterns = [p.strip().lower() for p in rule.phrase_pattern.split(",")]
            for pat in patterns:
                if pat in cleaned_query:
                    matched_rule = rule
                    break
            if matched_rule:
                break

        if matched_rule:
            metric = db.query(Metric).filter(Metric.metric_id == matched_rule.canonical_metric_id).first()
            if metric:
                parsed["canonical_metric_id"] = metric.metric_id
                parsed["metric_name"] = metric.display_name
                parsed["confidence"] = matched_rule.confidence_score
                parsed["is_supported"] = True

        # Build transformation pathway metadata for UI visualization
        pathway = {
            "user_intent": f'"{query}"',
            "raw_input_label": "RAW INPUT",
            "nlp_interpretation": parsed["intent"].replace("_", " ").title(),
            "synonym_label": "SYNONYM RESOLVED",
            "semantic_entity": parsed.get("metric_name", "Unknown Concept"),
            "ontology_label": "ONTOLOGY MAPPED",
            "formal_metric_id": parsed.get("canonical_metric_id", "N/A"),
            "executable_label": "EXECUTABLE SQL"
        }

        parsed["transformation_pathway"] = pathway
        return parsed
