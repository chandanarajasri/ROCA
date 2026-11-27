import hashlib
import json
import pandas as pd
from typing import Dict, Any, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.models.models import Metric, Transaction, Dataset, Analysis

class ValidationEngine:
    """
    Dual-engine validation service:
    1. Primary Engine: Compiled SQL execution against database.
    2. Independent Engine: Vectorized in-memory Pandas dataframe evaluation or Web3.py block stream.
    Validates calculation exactness & computes reproducibility hash.
    """

    TOLERANCE_ETH = 0.000001 # 10^-6 ETH float tolerance
    TOLERANCE_EXACT = 0.0   # 0 tolerance for integer counts

    @classmethod
    def execute_and_validate(
        cls,
        db: Session,
        metric: Metric,
        dataset: Dataset,
        executable_sql: str,
        sql_params: Dict[str, Any],
        original_query: str
    ) -> Dict[str, Any]:
        
        # 1. Primary Engine: Execute SQL query
        sql_result_row = db.execute(text(executable_sql), sql_params).fetchone()
        primary_val = float(sql_result_row[0]) if sql_result_row and sql_result_row[0] is not None else 0.0

        # 2. Independent Engine: Vectorized Pandas calculation from raw transaction records
        independent_val = cls._calculate_pandas_independent(db, metric.canonical_name, dataset.id)

        # 3. Discrepancy & Tolerance check
        diff = abs(primary_val - independent_val)
        is_integer_metric = metric.canonical_name in [
            "transaction_count", "daily_active_wallets", "unique_senders",
            "unique_receivers", "smart_contract_calls", "token_transfers"
        ]
        tolerance = cls.TOLERANCE_EXACT if is_integer_metric else cls.TOLERANCE_ETH
        
        is_verified = diff <= tolerance
        validation_status = "VERIFIED" if is_verified else "MISMATCH"

        # 4. Cryptographic Reproducibility Seal (SHA-256)
        reproducibility_payload = {
            "query": original_query,
            "metric_id": metric.metric_id,
            "metric_version": metric.version,
            "dataset_version": dataset.version,
            "dataset_name": dataset.name,
            "sql": executable_sql,
            "params": sql_params,
            "primary_result": primary_val,
            "independent_result": independent_val,
            "validation_status": validation_status
        }
        serialized = json.dumps(reproducibility_payload, sort_keys=True)
        reproducibility_hash = hashlib.sha256(serialized.encode("utf-8")).hexdigest()

        return {
            "primary_result": primary_val,
            "independent_result": independent_val,
            "difference": diff,
            "tolerance": tolerance,
            "validation_status": validation_status,
            "reproducibility_status": "READY",
            "reproducibility_hash": reproducibility_hash,
            "serialized_payload": serialized
        }

    @classmethod
    def _calculate_pandas_independent(cls, db: Session, canonical_name: str, dataset_id: int) -> float:
        # Fetch raw records for independent verification
        txs = db.query(Transaction).filter(
            Transaction.dataset_id == dataset_id,
            Transaction.status == "SUCCESS"
        ).all()

        if not txs:
            return 0.0

        data = [{
            "id": t.id,
            "sender": t.sender,
            "receiver": t.receiver,
            "value": t.value,
            "gas_used": t.gas_used,
            "gas_price": t.gas_price,
            "contract_address": t.contract_address,
            "transaction_type": t.transaction_type,
            "method_name": t.method_name,
            "status": t.status
        } for t in txs]

        df = pd.DataFrame(data)

        if canonical_name == "transaction_count":
            return float(len(df))
        elif canonical_name == "transaction_volume":
            return float(df["value"].sum())
        elif canonical_name == "daily_active_wallets":
            # Count distinct active addresses (senders)
            return float(df["sender"].nunique())
        elif canonical_name == "unique_senders":
            return float(df["sender"].nunique())
        elif canonical_name == "unique_receivers":
            return float(df["receiver"].dropna().nunique())
        elif canonical_name == "total_gas_used":
            return float(df["gas_used"].sum())
        elif canonical_name == "average_gas_used":
            return float(df["gas_used"].mean()) if not df.empty else 0.0
        elif canonical_name == "smart_contract_calls":
            return float(df[df["contract_address"].notna()]["id"].count())
        elif canonical_name == "dex_volume":
            return float(df[df["transaction_type"] == "Swap"]["value"].sum())
        elif canonical_name == "token_transfers":
            return float(df[df["method_name"] == "transfer"]["id"].count())
        else:
            return float(len(df))
