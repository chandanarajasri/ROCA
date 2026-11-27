from datetime import datetime, timedelta, timezone
from app.core.database import engine, Base, SessionLocal
from app.models.models import Dataset, Transaction, Metric, SemanticRule, Analysis, ReproducibilityReport
from app.metrics.definitions import CANONICAL_METRICS
import hashlib
import json

def seed_database():
    print("Initializing database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        existing_dataset = db.query(Dataset).filter(Dataset.slug == "eth-demo-1").first()
        if existing_dataset:
            print("Database already contains seed data. Refreshing...")
            db.query(ReproducibilityReport).delete()
            db.query(Analysis).delete()
            db.query(SemanticRule).delete()
            db.query(Metric).delete()
            db.query(Transaction).delete()
            db.query(Dataset).delete()
            db.commit()

        print("Seeding canonical dataset...")
        now = datetime.now(timezone.utc)
        demo_dataset = Dataset(
            name="Ethereum Mainnet (Curated Research Sample)",
            slug="eth-demo-1",
            description="Synthetic high-fidelity Ethereum transaction stream mirroring mainnet DeFi, ERC-20 transfers, and P2P value flows for scientific reproducibility.",
            version="ETH-DEMO-1.0",
            chain="Ethereum Mainnet",
            dataset_type="Synthetic Historical",
            block_start=18492000,
            block_end=18492105,
            tx_count=50,
            wallets_count=18
        )
        db.add(demo_dataset)
        db.commit()
        db.refresh(demo_dataset)

        # Realistic wallet addresses
        ALICE = "0x71C...49f"
        BOB = "0x8a2...32b"
        CHARLIE = "0x98d...44a"
        DAVID = "0x11c...7e0"
        UNISWAP_V3 = "0xE592427A0AEce92De3Edee1F18E0157C05861564"
        ONEINCH = "0x1111111254EEB25477B68fb85Ed929f73A960582"
        USDT_CONTRACT = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
        NULL_ADDRESS = "0x0000000000000000000000000000000000000000"

        # Base benchmark transactions (Sum = 15.0 ETH)
        base_txs = [
            ("0x8f4d5a2b1c3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f90", 18492100, now - timedelta(hours=5), ALICE, BOB, 2.0, 21000, 24.5, 0.00051, None, "Transfer", "transfer", "SUCCESS"),
            ("0x3e1a7c90b2d4f6a8c0e2a4b6d8e0f2a4c6e8a0b2d4f6a8c0e2a4b6d8e0f2a4c6", 18492101, now - timedelta(hours=4), BOB, CHARLIE, 5.0, 21000, 26.0, 0.00054, None, "Transfer", "transfer", "SUCCESS"),
            ("0x99bc11de3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c", 18492102, now - timedelta(hours=3), ALICE, DAVID, 1.0, 21000, 22.0, 0.00046, None, "Transfer", "transfer", "SUCCESS"),
            ("0x11aa55ff7c9b1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e", 18492103, now - timedelta(hours=2), DAVID, BOB, 3.0, 21000, 25.0, 0.00052, None, "Transfer", "transfer", "SUCCESS"),
            ("0x55bb33aa7c9b1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1f", 18492104, now - timedelta(hours=1), ALICE, CHARLIE, 4.0, 21000, 28.0, 0.00058, None, "Transfer", "transfer", "SUCCESS"),
        ]

        # Additional DeFi and contract transactions for ecosystem realism
        additional_txs = [
            ("0x7e2d4a6b8c0e2a4c6e8a0b2d4f6a8c0e2a4b6d8e0f2a4c6e8a0b2d4f6a8c0e2a", 18492105, now - timedelta(minutes=12), "0x3c7f9a2b4c6e8a0b2d4f6a8c0e2a4b6d8e0f2a4c", UNISWAP_V3, 1.25, 145000, 24.0, 0.00348, UNISWAP_V3, "Swap", "exactInputSingle", "SUCCESS"),
            ("0x6d1c8e0a2b4c6e8a0b2d4f6a8c0e2a4b6d8e0f2a4c6e8a0b2d4f6a8c0e2a4b6d", 18492104, now - timedelta(minutes=24), "0x4d6e8a0b2d4f6a8c0e2a4b6d8e0f2a4c6e8a0b2d", USDT_CONTRACT, 0.0, 48000, 20.0, 0.00096, USDT_CONTRACT, "Approve", "approve", "SUCCESS"),
            ("0x5c0b2d4f6a8c0e2a4b6d8e0f2a4c6e8a0b2d4f6a8c0e2a4b6d8e0f2a4c6e8a0b", 18492104, now - timedelta(minutes=24), NULL_ADDRESS, "0x6f4c8a0b2d4f6a8c0e2a4b6d8e0f2a4c6e8a0b2d", 0.0, 85000, 21.0, 0.00178, "0x6f4c8a0b2d4f6a8c0e2a4b6d8e0f2a4c6e8a0b2d", "Mint", "mint", "SUCCESS"),
            ("0x4b9a2b4c6e8a0b2d4f6a8c0e2a4b6d8e0f2a4c6e8a0b2d4f6a8c0e2a4b6d8e0f", 18492103, now - timedelta(minutes=36), "0x7a3b4c6e8a0b2d4f6a8c0e2a4b6d8e0f2a4c6e8a", ONEINCH, 0.0, 195000, 25.0, 0.00487, ONEINCH, "Multicall", "unoswapTo", "SUCCESS"),
            ("0x2a1b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b", 18492100, now - timedelta(minutes=50), "0x1a299f4c6e8a0b2d4f6a8c0e2a4b6d8e0f2a4c6e", UNISWAP_V3, 0.05, 120000, 22.0, 0.00264, UNISWAP_V3, "Swap", "swap", "SUCCESS"),
        ]

        # Insert transactions
        all_tx_data = base_txs + additional_txs
        tx_objects = []
        for row in all_tx_data:
            tx_obj = Transaction(
                dataset_id=demo_dataset.id,
                tx_hash=row[0],
                block_number=row[1],
                timestamp=row[2],
                sender=row[3],
                receiver=row[4],
                value=row[5],
                gas_used=row[6],
                gas_price=row[7],
                transaction_fee=row[8],
                contract_address=row[9],
                transaction_type=row[10],
                method_name=row[11],
                status=row[12]
            )
            tx_objects.append(tx_obj)

        db.add_all(tx_objects)
        db.commit()

        # Update dataset counts
        demo_dataset.tx_count = len(tx_objects)
        demo_dataset.wallets_count = len(set([t.sender for t in tx_objects] + [t.receiver for t in tx_objects if t.receiver]))
        db.commit()
        print(f"Inserted {len(tx_objects)} transactions.")

        # Seed Metrics
        print("Seeding canonical metric repository...")
        metric_objs = []
        for m in CANONICAL_METRICS:
            metric_objs.append(Metric(**m))
        db.add_all(metric_objs)
        db.commit()
        print(f"Inserted {len(metric_objs)} canonical metrics.")

        # Seed Semantic Rules
        print("Seeding semantic ontology rules...")
        rules_data = [
            ("RULE-TX-VOL-01", "how much eth was transferred, total eth transferred, transaction volume, total transaction value, eth volume", "Total Transfers", "TX-VOLUME-001", 0.98, "Maps volume and ETH transfer synonyms to Transaction Volume"),
            ("RULE-TX-CNT-01", "how many transactions happened, transaction count, number of transactions, total transactions, tx count", "Total Transactions", "TX-COUNT-001", 0.99, "Maps transaction counter phrases to Transaction Count"),
            ("RULE-DAW-01", "how many active wallets, daily active wallets, active users, daily users, unique wallets that transacted", "Active Users", "DAW-001", 0.96, "Maps user/wallet activity phrases to Daily Active Wallets"),
            ("RULE-GAS-01", "how much gas was used, total gas used, gas spent, fees, cumulative gas", "Total Gas Cost", "GAS-TOT-001", 0.92, "Maps gas and fee queries to Total Gas Used"),
            ("RULE-GAS-AVG-01", "what is the average gas, average gas used, mean gas, avg gas per transaction", "Average Gas", "GAS-AVG-001", 0.94, "Maps average computational cost queries"),
            ("RULE-SND-01", "how many unique senders, unique senders, distinct senders", "Unique Senders", "UNIQ-SND-001", 0.97, "Maps sender address counting expressions"),
            ("RULE-REC-01", "how many unique receivers, unique receivers, distinct receivers", "Unique Receivers", "UNIQ-REC-001", 0.97, "Maps receiver address counting expressions"),
            ("RULE-SC-01", "smart contract calls, contract interactions, contract calls, smart contract executions", "Smart Contracts", "SC-CALLS-001", 0.95, "Maps contract interaction queries to Smart Contract Calls"),
            ("RULE-DEX-01", "dex volume, uniswap volume, swap volume", "DEX Volume", "DEX-VOL-001", 0.90, "Maps decentralized exchange swap volume"),
            ("RULE-ERC20-01", "token transfers, erc20 transfers, token transfer count", "Token Transfers", "ERC20-TX-001", 0.93, "Maps ERC-20 transfer event phrases"),
        ]

        rule_objs = []
        for r in rules_data:
            rule_objs.append(SemanticRule(
                rule_id=r[0],
                phrase_pattern=r[1],
                semantic_concept=r[2],
                canonical_metric_id=r[3],
                confidence_score=r[4],
                description=r[5],
                version="1.0.0",
                is_active=True
            ))
        db.add_all(rule_objs)
        db.commit()
        print(f"Inserted {len(rule_objs)} semantic ontology rules.")

        # Seed Initial Benchmark Analysis & Reproducibility Report
        print("Seeding initial benchmark analysis...")
        init_analysis = Analysis(
            analysis_id="ROCA-AN-000001",
            original_query="How much ETH was transferred?",
            parsed_intent="transaction_volume",
            extracted_entities=json.dumps({"time_range": "All Recorded Blocks", "entity_chain": "Ethereum", "status_filter": "SUCCESS"}),
            canonical_metric_id="TX-VOLUME-001",
            dataset_id=demo_dataset.id,
            generated_sql="SELECT COALESCE(SUM(value), 0.0) FROM transactions WHERE dataset_id = 1 AND status = 'SUCCESS';",
            generated_web3="from web3 import Web3\n\nw3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))\ntotal_volume = sum(float(w3.from_wei(tx['value'], 'ether')) for b in range(18492000, 18492105) for tx in w3.eth.get_block(b, True).transactions)",
            primary_result=16.30, # 15 ETH base + 1.25 + 0.05
            result_unit="ETH",
            independent_result=16.30,
            discrepancy=0.0,
            tolerance=0.000001,
            validation_status="VERIFIED",
            reproducibility_status="READY",
            reproducibility_hash="7a59f1c29e46a783d8b4c05e192f6a8b7c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f",
            execution_time_ms=14.2,
            created_at=now - timedelta(days=1)
        )
        db.add(init_analysis)
        db.commit()

        init_report = ReproducibilityReport(
            report_id="REP-8492-AX",
            analysis_id=init_analysis.analysis_id,
            title="Reproducibility Report: Transaction Volume Analysis",
            author="Dr. E. Vance, ROCA Research",
            payload_snapshot=json.dumps({
                "query": init_analysis.original_query,
                "metric_id": init_analysis.canonical_metric_id,
                "result": init_analysis.primary_result
            }),
            reproduced_count=3,
            last_reproduced_at=now - timedelta(hours=3),
            last_reproduction_status="SUCCESSFULLY REPRODUCED"
        )
        db.add(init_report)
        db.commit()

        print("ROCA database seeded successfully!")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
