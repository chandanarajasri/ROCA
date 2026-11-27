import os
from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    model_config = ConfigDict(case_sensitive=True, env_file=".env")

    PROJECT_NAME: str = "ROCA - Reproducible On-Chain Analytics Framework"
    API_V1_STR: str = "/api"

    # Database - Default to SQLite file if PostgreSQL is not specified
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./roca.db")

    # Blockchain RPC
    GANACHE_RPC_URL: str = os.getenv("GANACHE_RPC_URL", "http://127.0.0.1:7545")

    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    FRAMEWORK_VERSION: str = "1.0.0-PROD"

settings = Settings()
