from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.router import api_router
from app.core.database import engine, Base, SessionLocal
from app.models.models import Dataset
from app.seed import seed_database

# Ensure database tables exist
Base.metadata.create_all(bind=engine)

# Auto seed if database is empty
db = SessionLocal()
try:
    if not db.query(Dataset).first():
        seed_database()
finally:
    db.close()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Formal Semantic & Reproducibility Framework for Blockchain Analytics",
    version=settings.FRAMEWORK_VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ROCA Backend",
        "version": settings.FRAMEWORK_VERSION,
        "environment": settings.ENVIRONMENT
    }

# Mount all routers under /api
app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
