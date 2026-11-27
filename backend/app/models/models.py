from sqlalchemy import Column, Integer, String, DateTime, Text, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base

def utcnow():
    return datetime.now(timezone.utc)

class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    slug = Column(String(50), nullable=False, unique=True, index=True)
    description = Column(Text, nullable=True)
    version = Column(String(20), nullable=False, default="ETH-DEMO-1.0")
    chain = Column(String(50), nullable=False, default="Ethereum Mainnet")
    dataset_type = Column(String(50), nullable=False, default="Synthetic Historical")
    block_start = Column(Integer, default=18492000)
    block_end = Column(Integer, default=18492105)
    tx_count = Column(Integer, default=0)
    wallets_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=utcnow)
    updated_at = Column(DateTime, default=utcnow, onupdate=utcnow)

    transactions = relationship("Transaction", back_populates="dataset", cascade="all, delete-orphan")
    analyses = relationship("Analysis", back_populates="dataset")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    dataset_id = Column(Integer, ForeignKey("datasets.id"), nullable=False, index=True)
    tx_hash = Column(String(66), unique=True, index=True, nullable=False)
    block_number = Column(Integer, index=True, nullable=False)
    timestamp = Column(DateTime, index=True, nullable=False)
    sender = Column(String(42), index=True, nullable=False)     # from address
    receiver = Column(String(42), index=True, nullable=True)     # to address (or null for contract creation)
    value = Column(Float, nullable=False, default=0.0)           # in ETH
    gas_used = Column(Integer, nullable=False, default=21000)
    gas_price = Column(Float, nullable=False, default=20.0)      # in Gwei
    transaction_fee = Column(Float, nullable=False, default=0.0) # in ETH
    contract_address = Column(String(42), nullable=True)
    transaction_type = Column(String(50), nullable=False, default="Transfer") # Transfer, Swap, Approve, Mint, Contract Call
    method_name = Column(String(50), nullable=False, default="transfer")
    status = Column(String(20), nullable=False, default="SUCCESS") # SUCCESS, FAILED
    created_at = Column(DateTime, default=utcnow)

    dataset = relationship("Dataset", back_populates="transactions")


class Metric(Base):
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True, index=True)
    metric_id = Column(String(50), unique=True, index=True, nullable=False) # e.g. TX-VOLUME-001
    canonical_name = Column(String(100), unique=True, nullable=False)      # e.g. transaction_volume
    display_name = Column(String(100), nullable=False)                     # e.g. Transaction Volume
    category = Column(String(50), nullable=False, default="Core Volume")
    description = Column(Text, nullable=False)
    formal_definition = Column(Text, nullable=False)                       # e.g. SUM(transaction_value)
    latex_formula = Column(String(255), nullable=True)                     # e.g. \sum_{i=1}^n v_i
    sql_template = Column(Text, nullable=False)
    web3_template = Column(Text, nullable=True)
    unit = Column(String(20), nullable=False, default="ETH")
    required_columns = Column(String(255), nullable=False, default="value")
    version = Column(String(20), nullable=False, default="1.0.0")
    status = Column(String(20), nullable=False, default="VERIFIED")         # VERIFIED, DRAFT, EXPERIMENTAL
    created_at = Column(DateTime, default=utcnow)
    updated_at = Column(DateTime, default=utcnow, onupdate=utcnow)

    semantic_rules = relationship("SemanticRule", back_populates="metric")
    analyses = relationship("Analysis", back_populates="metric")


class SemanticRule(Base):
    __tablename__ = "semantic_rules"

    id = Column(Integer, primary_key=True, index=True)
    rule_id = Column(String(50), unique=True, index=True, nullable=False) # e.g. RULE-TX-VOL-01
    phrase_pattern = Column(String(255), nullable=False)                   # e.g. "how much eth was transferred", "volume"
    semantic_concept = Column(String(100), nullable=False)                 # e.g. "Total ETH Volume"
    canonical_metric_id = Column(String(50), ForeignKey("metrics.metric_id"), nullable=False)
    confidence_score = Column(Float, nullable=False, default=0.98)
    description = Column(Text, nullable=True)
    version = Column(String(20), nullable=False, default="1.0.0")
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(DateTime, default=utcnow)

    metric = relationship("Metric", back_populates="semantic_rules")


class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(String(50), unique=True, index=True, nullable=False) # ROCA-AN-000001
    original_query = Column(Text, nullable=False)
    parsed_intent = Column(String(100), nullable=False)
    extracted_entities = Column(Text, nullable=True) # JSON serialized
    canonical_metric_id = Column(String(50), ForeignKey("metrics.metric_id"), nullable=False)
    dataset_id = Column(Integer, ForeignKey("datasets.id"), nullable=False)
    generated_sql = Column(Text, nullable=False)
    generated_web3 = Column(Text, nullable=True)
    
    # Results
    primary_result = Column(Float, nullable=False)
    result_unit = Column(String(20), nullable=False, default="ETH")
    independent_result = Column(Float, nullable=False)
    discrepancy = Column(Float, nullable=False, default=0.0)
    tolerance = Column(Float, nullable=False, default=0.000001)
    
    # Statuses
    validation_status = Column(String(20), nullable=False, default="VERIFIED") # VERIFIED, MISMATCH, UNVERIFIED
    reproducibility_status = Column(String(20), nullable=False, default="READY") # READY, REPRODUCED, MISMATCH
    reproducibility_hash = Column(String(64), nullable=False) # SHA-256
    execution_time_ms = Column(Float, default=12.5)
    
    created_at = Column(DateTime, default=utcnow)

    dataset = relationship("Dataset", back_populates="analyses")
    metric = relationship("Metric", back_populates="analyses")
    reports = relationship("ReproducibilityReport", back_populates="analysis")


class ReproducibilityReport(Base):
    __tablename__ = "reproducibility_reports"

    id = Column(Integer, primary_key=True, index=True)
    report_id = Column(String(50), unique=True, index=True, nullable=False) # REP-8492-AX
    analysis_id = Column(String(50), ForeignKey("analyses.analysis_id"), nullable=False)
    title = Column(String(200), nullable=False)
    author = Column(String(100), default="Dr. E. Vance, ROCA Research")
    payload_snapshot = Column(Text, nullable=False) # Complete JSON snapshot of query, AST, DB state, results
    reproduced_count = Column(Integer, default=0)
    last_reproduced_at = Column(DateTime, nullable=True)
    last_reproduction_status = Column(String(20), default="NOT_RUN")
    created_at = Column(DateTime, default=utcnow)

    analysis = relationship("Analysis", back_populates="reports")
