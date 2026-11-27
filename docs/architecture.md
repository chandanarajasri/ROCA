# ROCA System Architecture

## Overview
**ROCA (Reproducible On-Chain Analytics)** is a scientific and institutional framework that solves semantic ambiguity and reproducibility challenges in blockchain data analysis.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                 FRONTEND (React + TypeScript + Tailwind)                │
│  - Home (Workflow & Modules)                                            │
│  - Ecosystem Overview Dashboard                                         │
│  - Query Workspace (NL Query Input, Pipeline Progress, Receipt Seal)    │
│  - Semantic Rule Engine (Transformation Pathway & Rule Dictionary)      │
│  - Metric Repository (Formal LaTeX & Verified SQL Definitions)          │
│  - Query Generator (Standard SQL vs Web3.py)                            │
│  - Dataset Explorer (Transactions, Methods, Filters)                    │
│  - Result Validation (Dual-Engine Comparison & State Divergence)        │
│  - Reproducibility Reports (PDF Generator & Instant Re-execution)      │
│  - Research Page & System Admin                                         │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ REST API (JSON)
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       FASTAPI BACKEND PIPELINE                          │
│                                                                         │
│  1. Query Parser           → Rule-based NLP intent & entity extraction  │
│  2. Semantic Rule Engine   → Maps synonyms/aliases to Canonical Metrics │
│  3. Metric Repository      → Formal formulas & parameterized templates  │
│  4. Query Generator        → Generates parameter-safe SQL & Web3.py     │
│  5. Execution Engine       → Executes query against PostgreSQL / SQLite │
│  6. Validation Engine      → In-memory Pandas Vector Calculation        │
│  7. Reproducibility Engine → SHA-256 Hash Seals & Re-execution          │
│  8. Report Generator       → ReportLab PDF Research Documents           │
│  9. Blockchain Service     → Web3.py RPC Connector (Ganache)           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                  ┌──────────────────┴──────────────────┐
                  ▼                                     ▼
    ┌───────────────────────────┐         ┌───────────────────────────┐
    │     DATABASE STORAGE      │         │     BLOCKCHAIN TESTBED    │
    │  - PostgreSQL / SQLite    │         │  - Ganache (Port 7545)    │
    │  - Normalized Schema      │         │  - Hardhat Contracts      │
    │  - Indices on Hash & Block│         │  - Web3.py Event Stream   │
    └───────────────────────────┘         └───────────────────────────┘
```

## Core Subsystems
1. **Query Parser**: Deterministic NLP parser that extracts analytical intent without relying on non-deterministic external LLMs.
2. **Semantic Rule Engine**: Formal ontology mapping user aliases to standardized canonical metric definitions with confidence scores.
3. **Dual-Engine Validation**: Evaluates compiled SQL against an independent in-memory Pandas dataframe evaluation or Web3.py block stream.
4. **Reproducibility Layer**: Cryptographically binds the metric definition version, dataset snapshot, execution parameters, and results into a SHA-256 signature and allows one-click reproduction.
