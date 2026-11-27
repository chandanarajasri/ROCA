# ROCA Research Methodology

## Formal Semantics & Reproducibility in Blockchain Analytics

### Problem Statement
Blockchain data analytics frequently suffers from:
1. **Semantic Ambiguity**: The same question (e.g. *"How many active users were there?"*) is interpreted differently across teams (e.g., counting unique senders vs. senders + receivers vs. contract callers).
2. **Ad-Hoc SQL Generation**: Hand-written queries often introduce discrepancies in status filtering, token decimals, and temporal boundaries.
3. **Reproducibility Gap**: Research findings cannot be verified or re-executed deterministically against evolving on-chain data state.

### ROCA Solution & Workflow
1. **Formal Ontology Mapping**: Natural language phrases are parsed and mapped to formal metrics (e.g., `DAW-001`, `TX-VOLUME-001`) with explicit mathematical definitions and AST constraints.
2. **Safe SQL Compilation**: Prevents arbitrary SQL execution and injects strongly-typed constraints.
3. **Independent Multi-Engine Validation**: Every analytical execution is cross-validated against an independent engine (SQL DB vs Pandas/Web3 vectorization) with defined floating-point tolerances ($10^{-6}$ ETH).
4. **Cryptographic State Hash**: Encapsulates runtime metadata into an immutable SHA-256 seal for auditability and one-click re-execution.
