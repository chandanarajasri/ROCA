from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
from datetime import datetime

class QueryParseRequest(BaseModel):
    query: str

class ExtractedEntities(BaseModel):
    time_range: Optional[str] = None
    time_days: Optional[int] = None
    entity_chain: Optional[str] = "Ethereum"
    sender_filter: Optional[str] = None
    receiver_filter: Optional[str] = None
    min_value: Optional[float] = None
    status_filter: Optional[str] = "SUCCESS"

class QueryParseResponse(BaseModel):
    original_query: str
    intent: str
    canonical_metric_id: str
    metric_name: str
    confidence: float
    entities: ExtractedEntities
    explanation_steps: List[str]
    is_supported: bool
    suggestions: List[str] = []

class QueryGenerateRequest(BaseModel):
    metric_id: str
    dataset_id: Optional[int] = 1
    time_days: Optional[int] = None
    chain: Optional[str] = "Ethereum"
    status_filter: Optional[str] = "SUCCESS"

class QueryGenerateResponse(BaseModel):
    metric_id: str
    metric_name: str
    formal_definition: str
    standard_sql: str
    web3_python: str
    required_columns: List[str]
    ast_summary: Dict[str, Any]

class AnalysisRequest(BaseModel):
    query: str
    dataset_id: Optional[int] = 1
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class AnalysisResponse(BaseModel):
    analysis_id: str
    query: str
    parsed_intent: Optional[str] = None
    metric_id: str
    metric: str
    metric_version: str
    dataset_name: str
    dataset_version: str
    generated_sql: str
    generated_web3: Optional[str] = None
    result: float
    unit: str
    independent_result: float
    difference: float
    tolerance: float
    validation_status: str
    reproducibility_status: str
    reproducibility_hash: str
    execution_time_ms: float
    timestamp: datetime
    entities: Optional[Dict[str, Any]] = None
    report_id: Optional[str] = None

class ReproductionResponse(BaseModel):
    analysis_id: str
    report_id: str
    original_result: float
    reproduced_result: float
    unit: str
    difference: float
    reproduction_status: str # "SUCCESSFULLY REPRODUCED" or "REPRODUCTION MISMATCH"
    reproduced_at: datetime
    is_match: bool
    reproducibility_hash: str

class MetricBase(BaseModel):
    metric_id: str
    canonical_name: str
    display_name: str
    category: str = "Core Volume"
    description: str
    formal_definition: str
    latex_formula: Optional[str] = None
    sql_template: str
    web3_template: Optional[str] = None
    unit: str = "ETH"
    required_columns: str = "value"
    version: str = "1.0.0"
    status: str = "VERIFIED"

class MetricCreate(MetricBase):
    pass

class MetricSchema(MetricBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

class SemanticRuleBase(BaseModel):
    rule_id: str
    phrase_pattern: str
    semantic_concept: str
    canonical_metric_id: str
    confidence_score: float = 0.95
    description: Optional[str] = None
    version: str = "1.0.0"
    is_active: bool = True

class SemanticRuleCreate(SemanticRuleBase):
    pass

class SemanticRuleSchema(SemanticRuleBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: datetime

class TransactionSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    tx_hash: str
    block_number: int
    timestamp: datetime
    sender: str
    receiver: Optional[str] = None
    value: float
    gas_used: int
    gas_price: float
    transaction_fee: float
    contract_address: Optional[str] = None
    transaction_type: str
    method_name: str
    status: str
    created_at: datetime

class DatasetSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    slug: str
    description: Optional[str] = None
    version: str
    chain: str
    dataset_type: str
    block_start: int
    block_end: int
    tx_count: int
    wallets_count: int
    created_at: datetime

class ReportSummarySchema(BaseModel):
    report_id: str
    analysis_id: str
    title: str
    author: str
    query: str
    metric: str
    result: float
    unit: str
    validation_status: str
    reproducibility_status: str
    created_at: datetime
    reproduced_count: int
    last_reproduced_at: Optional[datetime] = None

class DashboardStatsResponse(BaseModel):
    total_transactions: int
    unique_wallets: int
    total_volume_eth: float
    total_blocks: int
    total_smart_contracts: int
    queries_processed: int
    metrics_defined: int
    validated_queries: int
    reproducible_analyses: int
    gas_usage_avg_gwei: float
    daily_transactions: List[Dict[str, Any]]
    daily_volume: List[Dict[str, Any]]
    active_wallets_series: List[Dict[str, Any]]
    block_growth: List[Dict[str, Any]]
    recent_transactions: List[TransactionSchema]
