from fastapi import APIRouter
from app.api.endpoints import (
    dashboard,
    analyses,
    query,
    metrics,
    semantic_rules,
    datasets,
    transactions,
    validation,
    reports,
    blockchain,
)

api_router = APIRouter()

api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(analyses.router, prefix="/analysis", tags=["Analysis Pipeline"])
api_router.include_router(query.router, prefix="/query", tags=["Query Operations"])
api_router.include_router(metrics.router, prefix="/metrics", tags=["Metric Repository"])
api_router.include_router(semantic_rules.router, prefix="/semantic-rules", tags=["Semantic Engine"])
api_router.include_router(datasets.router, prefix="/datasets", tags=["Dataset Explorer"])
api_router.include_router(transactions.router, prefix="/transactions", tags=["Transactions"])
api_router.include_router(validation.router, prefix="/validation", tags=["Validation Engine"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reproducibility Reports"])
api_router.include_router(blockchain.router, prefix="/blockchain", tags=["Blockchain Node"])
