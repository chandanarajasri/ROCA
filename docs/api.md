# ROCA REST API Reference

The backend exposes an OpenAPI-compliant REST API under `/api`.

Interactive Documentation:
- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## Endpoints

### 1. Analysis Pipeline
- `POST /api/analysis`: Executes full natural language query analysis pipeline (parse $\rightarrow$ semantic map $\rightarrow$ query generation $\rightarrow$ DB execution $\rightarrow$ validation $\rightarrow$ report creation).
- `GET /api/analysis/{id}`: Retrieves analysis execution receipt.
- `POST /api/analysis/{id}/reproduce`: Re-executes previous analysis and verifies deterministic output.

### 2. Query Operations
- `POST /api/query/parse`: Resolves NL query into intent, entities, and canonical metric ID.
- `POST /api/query/generate`: Generates parameterized Standard SQL and Web3.py snippet.

### 3. Metric Repository & Semantic Rules
- `GET /api/metrics`: Lists all registered canonical metrics with formal formulas.
- `GET /api/metrics/{id}`: Retrieves single metric definition.
- `POST /api/metrics`: Registers a new metric.
- `GET /api/semantic-rules`: Lists active synonym rules.
- `POST /api/semantic-rules`: Registers a new synonym rule.
- `PUT /api/semantic-rules/{id}/toggle`: Enables or disables a rule.

### 4. Dataset Explorer & Transactions
- `GET /api/datasets`: Lists active blockchain datasets.
- `GET /api/transactions`: Search, filter, and paginate through on-chain transactions.

### 5. Validation & Reports
- `GET /api/validation/summary`: Global consistency scores and bounds verification.
- `GET /api/validation/divergence`: Compares SQL outputs against raw node RPC state.
- `GET /api/reports`: Lists all reproducibility reports.
- `GET /api/reports/{id}/pdf`: Downloads academic PDF reproducibility report.

### 6. Blockchain RPC
- `GET /api/blockchain/status`: Real-time Ganache connection status and block height.
