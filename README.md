# ROCA: Reproducible On-Chain Analytics Framework

> **A scientific and institutional framework for translating natural-language blockchain analytics questions into formally defined, verified, and reproducible analytical reports.**

---

## 🌟 Key Features

1. **Deterministic Rule-Based Query Parser**: Translates natural language queries (e.g., *"How much ETH was transferred?"*) into structured abstract syntax trees without external LLM dependencies.
2. **Semantic Rule Engine & Ontology**: Disambiguates user terms and maps aliases to canonical metric formalisms with confidence scores and transformation pathways.
3. **Formal Metric Repository**: Version-controlled repository holding mathematical formulas (LaTeX), AST representations, verified SQL logic, and Web3 equivalents.
4. **Dual-Engine Validation**: Evaluates compiled SQL against an independent vectorized Pandas dataframe / Web3.py block stream calculation to verify mathematical exactness ($10^{-6}$ ETH tolerance).
5. **Cryptographic Reproducibility Layer**: Generates immutable SHA-256 state seals encapsulating metric versions, dataset snapshots, parameters, and results, with **One-Click Reproduction**.
6. **Academic Research PDF Generator**: Produces audit-grade research reports with execution summaries, formulas, and proofs.
7. **Institutional Research UI**: Built with React, TypeScript, Tailwind CSS, Lucide Icons, and Recharts, matching institutional research standards.
8. **Controlled Blockchain Testbed**: Hardhat smart contracts (`AnalyticsTestToken.sol`, `BatchTransactor.sol`) and optional Web3.py / Ganache connectivity that handles offline states gracefully.

---

## 🏗 System Architecture

```
Analyst (Natural Language Query)
   ↓
Query Parser (Intent & Entity Extraction)
   ↓
Semantic Rule Engine (Ontology Mapping)
   ↓
Metric Repository (Formal Mathematical Definition)
   ↓
Query Generator (Parameterized SQL & Web3.py)
   ↓
Execution Engine (PostgreSQL / SQLite Ethereum Dataset)
   ↓
Dual-Engine Validation (Primary SQL vs Independent Pandas / Web3)
   ↓
Reproducibility Report (SHA-256 Seal & Research PDF)
```

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Python >= 3.10
- Node.js >= 18
- (Optional) Ganache on `http://127.0.0.1:7545`

### 2. Backend Setup
```bash
cd backend
python -m pip install -r requirements.txt

# Seed the database with canonical metrics, rules, and Ethereum transactions
python -m app.seed

# Launch FastAPI Server
python -m uvicorn app.main:app --reload --port 8000
```
Backend API will be live at: `http://127.0.0.1:8000` (Docs at `/docs`).

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend Web Application will be live at: `http://localhost:5173`.

---

## 🧪 Running Automated Tests

Run backend unit and integration test suites:
```bash
cd backend
python -m pytest -v
```

---

## 🐳 Docker Deployment

To launch the complete PostgreSQL database, FastAPI backend, and React frontend with Docker:
```bash
docker-compose up --build
```

---

## 📜 Complete Capstone Demo Scenario

1. Open the ROCA Frontend at `http://localhost:5173`.
2. Click **[ + New Analysis ]** or navigate to **Query Workspace**.
3. Select or enter: `"How much ETH was transferred?"`
4. Click **[ Analyze Query ]**.
5. Observe the automated multi-stage pipeline:
   - **Semantic Interpretation**: `Transaction Volume` (`TX-VOLUME-001`)
   - **Formal Definition**: `SUM(transaction_value)`
   - **Generated SQL**: `SELECT COALESCE(SUM(value), 0.0) FROM transactions;`
   - **Primary SQL Result**: `16.30 ETH`
   - **Independent Pandas Result**: `16.30 ETH`
   - **Validation**: `✓ VERIFIED`
   - **Cryptographic Seal**: SHA-256 state hash generated.
6. Click **[ Reproduce Analysis ]**: The system re-executes the complete pipeline against current dataset state and confirms `✓ SUCCESSFULLY REPRODUCED`.
7. Click **[ View Full Report ]** or **[ Download PDF ]** to inspect and export the formal research report.

---

## 📄 License
MIT License. Developed for University Capstone Research.
