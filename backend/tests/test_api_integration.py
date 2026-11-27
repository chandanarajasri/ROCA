import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_dashboard_stats_endpoint():
    response = client.get("/api/dashboard/stats")
    assert response.status_code == 200
    data = response.json()
    assert "total_transactions" in data
    assert data["total_transactions"] >= 5
    assert "total_volume_eth" in data

def test_metrics_listing_endpoint():
    response = client.get("/api/metrics")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 8

def test_analysis_execution_pipeline():
    payload = {
        "query": "How much ETH was transferred?",
        "dataset_id": 1
    }
    response = client.post("/api/analysis", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["metric"] == "Transaction Volume"
    assert data["validation_status"] == "VERIFIED"
    assert data["result"] > 0
    assert data["reproducibility_status"] == "READY"
    assert data["analysis_id"].startswith("ROCA-AN-")

    # Now test reproduction
    analysis_id = data["analysis_id"]
    repro_response = client.post(f"/api/analysis/{analysis_id}/reproduce")
    assert repro_response.status_code == 200
    repro_data = repro_response.json()
    assert repro_data["reproduction_status"] == "SUCCESSFULLY REPRODUCED"
    assert repro_data["is_match"] is True
