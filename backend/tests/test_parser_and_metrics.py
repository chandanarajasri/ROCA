import pytest
from app.semantic.parser import QueryParser
from app.metrics.definitions import CANONICAL_METRICS

def test_query_parser_transaction_count():
    res = QueryParser.parse("How many transactions happened?")
    assert res["is_supported"] is True
    assert res["intent"] == "transaction_count"
    assert res["canonical_metric_id"] == "TX-COUNT-001"
    assert res["confidence"] >= 0.90

def test_query_parser_transaction_volume():
    res = QueryParser.parse("How much ETH was transferred?")
    assert res["is_supported"] is True
    assert res["intent"] == "transaction_volume"
    assert res["canonical_metric_id"] == "TX-VOLUME-001"

def test_query_parser_active_wallets():
    res = QueryParser.parse("How many active wallets were there?")
    assert res["is_supported"] is True
    assert res["intent"] == "daily_active_wallets"
    assert res["canonical_metric_id"] == "DAW-001"

def test_query_parser_gas_used():
    res = QueryParser.parse("How much gas was used?")
    assert res["is_supported"] is True
    assert res["intent"] == "total_gas_used"
    assert res["canonical_metric_id"] == "GAS-TOT-001"

def test_query_parser_unsupported_query():
    res = QueryParser.parse("What is the weather in Paris today?")
    assert res["is_supported"] is False
    assert len(res["suggestions"]) > 0

def test_canonical_metrics_loaded():
    assert len(CANONICAL_METRICS) >= 8
    metric_ids = [m["metric_id"] for m in CANONICAL_METRICS]
    assert "TX-COUNT-001" in metric_ids
    assert "TX-VOLUME-001" in metric_ids
    assert "DAW-001" in metric_ids
    assert "GAS-TOT-001" in metric_ids
