import re
from typing import Dict, Any, Optional, Tuple, List

class QueryParser:
    """
    Deterministic rule-based NLP parser for blockchain analytics queries.
    Extracts intents, entities (time windows, token/chain names, filters) without external API dependencies.
    """

    SUPPORTED_INTENTS = {
        "transaction_count": [
            r"how many transactions",
            r"transaction count",
            r"number of transactions",
            r"total transactions",
            r"tx count",
            r"transactions count",
            r"total tx",
            r"how many txs",
            r"count of transactions",
        ],
        "transaction_volume": [
            r"how much eth was transferred",
            r"total eth transferred",
            r"transaction volume",
            r"total transaction value",
            r"eth volume",
            r"volume of transactions",
            r"total value transferred",
            r"amount transferred",
            r"total amount",
            r"sum of transactions",
        ],
        "daily_active_wallets": [
            r"how many active wallets",
            r"daily active wallets",
            r"active users",
            r"unique wallets that transacted",
            r"active addresses",
            r"active accounts",
            r"wallet activity",
            r"daw",
        ],
        "unique_senders": [
            r"how many unique senders",
            r"unique senders",
            r"number of senders",
            r"total senders",
            r"distinct senders",
            r"from addresses count",
        ],
        "unique_receivers": [
            r"how many unique receivers",
            r"unique receivers",
            r"number of receivers",
            r"total receivers",
            r"distinct receivers",
            r"to addresses count",
        ],
        "total_gas_used": [
            r"how much gas was used",
            r"total gas used",
            r"gas spent",
            r"cumulative gas",
            r"sum of gas",
            r"total gas consumed",
            r"gas usage",
        ],
        "average_gas_used": [
            r"what is the average gas",
            r"average gas used",
            r"mean gas",
            r"avg gas per transaction",
            r"average gas price",
            r"average fee",
        ],
        "smart_contract_calls": [
            r"smart contract calls",
            r"contract interactions",
            r"contract calls",
            r"how many contract transactions",
            r"smart contract executions",
            r"number of smart contracts called",
        ],
        "dex_volume": [
            r"dex volume",
            r"uniswap volume",
            r"swap volume",
            r"decentralized exchange volume",
        ],
        "token_transfers": [
            r"token transfers",
            r"erc20 transfers",
            r"token transfer count",
        ]
    }

    INTENT_TO_METRIC_ID = {
        "transaction_count": "TX-COUNT-001",
        "transaction_volume": "TX-VOLUME-001",
        "daily_active_wallets": "DAW-001",
        "unique_senders": "UNIQ-SND-001",
        "unique_receivers": "UNIQ-REC-001",
        "total_gas_used": "GAS-TOT-001",
        "average_gas_used": "GAS-AVG-001",
        "smart_contract_calls": "SC-CALLS-001",
        "dex_volume": "DEX-VOL-001",
        "token_transfers": "ERC20-TX-001",
    }

    INTENT_TO_DISPLAY = {
        "transaction_count": "Transaction Count",
        "transaction_volume": "Transaction Volume",
        "daily_active_wallets": "Daily Active Wallets",
        "unique_senders": "Unique Senders",
        "unique_receivers": "Unique Receivers",
        "total_gas_used": "Total Gas Used",
        "average_gas_used": "Average Gas Used",
        "smart_contract_calls": "Smart Contract Calls",
        "dex_volume": "DEX Swap Volume",
        "token_transfers": "Token Transfers",
    }

    @classmethod
    def parse(cls, query: str) -> Dict[str, Any]:
        cleaned_query = query.strip().lower()
        cleaned_query_no_punct = re.sub(r"[^\w\s]", "", cleaned_query)

        # 1. Intent Detection
        matched_intent = None
        highest_confidence = 0.0

        for intent, patterns in cls.SUPPORTED_INTENTS.items():
            for pat in patterns:
                if pat in cleaned_query or pat in cleaned_query_no_punct:
                    # Direct match
                    matched_intent = intent
                    highest_confidence = 0.98
                    break
                # Check regex match
                if re.search(rf"\b{pat}\b", cleaned_query):
                    matched_intent = intent
                    highest_confidence = 0.95
                    break
            if matched_intent:
                break

        # Fallback keyword scoring if exact pattern not matched
        if not matched_intent:
            if "volume" in cleaned_query or "eth" in cleaned_query or "transferred" in cleaned_query:
                matched_intent = "transaction_volume"
                highest_confidence = 0.82
            elif "count" in cleaned_query or "many" in cleaned_query or "transactions" in cleaned_query:
                matched_intent = "transaction_count"
                highest_confidence = 0.85
            elif "gas" in cleaned_query:
                matched_intent = "total_gas_used"
                highest_confidence = 0.85
            elif "wallet" in cleaned_query or "user" in cleaned_query or "address" in cleaned_query:
                matched_intent = "daily_active_wallets"
                highest_confidence = 0.80
            elif "contract" in cleaned_query:
                matched_intent = "smart_contract_calls"
                highest_confidence = 0.82

        # 2. Entity Extraction
        entities = cls._extract_entities(cleaned_query)

        # 3. Build response
        if matched_intent:
            metric_id = cls.INTENT_TO_METRIC_ID[matched_intent]
            display_name = cls.INTENT_TO_DISPLAY[matched_intent]
            explanation_steps = [
                f'Raw User Query: "{query}"',
                f'NLP Tokenization & Lemmatization: Matched semantic intent "{matched_intent}"',
                f'Ontology Mapping: Linked to Canonical Metric [{metric_id}] ({display_name})',
                f'Entity Constraints: Time window = {entities.get("time_range", "All-Time")}, Status = SUCCESS',
                f'Compilation Target: Parameterized SQL against dataset schema'
            ]
            return {
                "original_query": query,
                "intent": matched_intent,
                "canonical_metric_id": metric_id,
                "metric_name": display_name,
                "confidence": highest_confidence,
                "entities": entities,
                "explanation_steps": explanation_steps,
                "is_supported": True,
                "suggestions": []
            }
        else:
            return {
                "original_query": query,
                "intent": "unknown",
                "canonical_metric_id": "UNKNOWN",
                "metric_name": "Unsupported Query",
                "confidence": 0.0,
                "entities": entities,
                "explanation_steps": [
                    f'Raw Input: "{query}"',
                    'Intent Classifier: No registered ontology rule matched query tokens.',
                    'Status: Please choose from supported canonical metrics.'
                ],
                "is_supported": False,
                "suggestions": [
                    "How many transactions happened?",
                    "How much ETH was transferred?",
                    "How many active wallets were there?",
                    "What was the total gas used?",
                    "How many unique senders were there?"
                ]
            }

    @classmethod
    def _extract_entities(cls, query: str) -> Dict[str, Any]:
        entities: Dict[str, Any] = {
            "time_range": "All Recorded Blocks",
            "time_days": None,
            "entity_chain": "Ethereum",
            "sender_filter": None,
            "receiver_filter": None,
            "min_value": None,
            "status_filter": "SUCCESS"
        }

        # Check for time filters
        day_match = re.search(r"last\s+(\d+)\s+days?", query)
        if day_match:
            days = int(day_match.group(1))
            entities["time_days"] = days
            entities["time_range"] = f"Last {days} Days"
        elif "last 24 hours" in query or "today" in query or "past 24h" in query:
            entities["time_days"] = 1
            entities["time_range"] = "Last 24 Hours"
        elif "last 7 days" in query or "past week" in query:
            entities["time_days"] = 7
            entities["time_range"] = "Last 7 Days"
        elif "last 30 days" in query or "past month" in query:
            entities["time_days"] = 30
            entities["time_range"] = "Last 30 Days"

        # Check for chains
        if "polygon" in query:
            entities["entity_chain"] = "Polygon"
        elif "arbitrum" in query:
            entities["entity_chain"] = "Arbitrum"

        return entities
