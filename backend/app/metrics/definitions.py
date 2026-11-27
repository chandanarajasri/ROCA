from typing import Dict, Any, List

CANONICAL_METRICS: List[Dict[str, Any]] = [
    {
        "metric_id": "TX-COUNT-001",
        "canonical_name": "transaction_count",
        "display_name": "Transaction Count",
        "category": "Network Activity",
        "description": "Total number of confirmed blockchain transactions recorded within the dataset scope.",
        "formal_definition": "COUNT(transaction_hash)",
        "latex_formula": r"\sum_{i=1}^N 1",
        "sql_template": "SELECT COUNT(id) FROM transactions WHERE dataset_id = :dataset_id AND status = :status_filter",
        "web3_template": """from web3 import Web3

w3 = Web3(Web3.HTTPProvider('{rpc_url}'))
# Count transactions in range
tx_count = sum(w3.eth.get_block_transaction_count(b) for b in range({start_block}, {end_block} + 1))
print(f"Transaction Count: {tx_count}")""",
        "unit": "Tx",
        "required_columns": "id, status",
        "version": "1.0.0",
        "status": "VERIFIED"
    },
    {
        "metric_id": "TX-VOLUME-001",
        "canonical_name": "transaction_volume",
        "display_name": "Transaction Volume",
        "category": "Core Volume",
        "description": "The aggregate nominal cryptocurrency (ETH) transferred across all recorded transactions.",
        "formal_definition": "SUM(transaction_value)",
        "latex_formula": r"\sum_{i=1}^N v_i \quad \text{where } v_i \ge 0",
        "sql_template": "SELECT COALESCE(SUM(value), 0.0) FROM transactions WHERE dataset_id = :dataset_id AND status = :status_filter",
        "web3_template": """from web3 import Web3

w3 = Web3(Web3.HTTPProvider('{rpc_url}'))
total_volume = 0.0
for b in range({start_block}, {end_block} + 1):
    block = w3.eth.get_block(b, full_transactions=True)
    for tx in block.transactions:
        total_volume += float(w3.from_wei(tx['value'], 'ether'))
print(f"Total ETH Volume: {total_volume:.6f} ETH")""",
        "unit": "ETH",
        "required_columns": "value, status",
        "version": "1.0.0",
        "status": "VERIFIED"
    },
    {
        "metric_id": "DAW-001",
        "canonical_name": "daily_active_wallets",
        "display_name": "Daily Active Wallets (DAW)",
        "category": "User Engagement",
        "description": "The unique count of wallet addresses that have initiated (sent) or received at least one transaction within the dataset window.",
        "formal_definition": "COUNT(DISTINCT sender) + COUNT(DISTINCT receiver)",
        "latex_formula": r"| \{ s_i \mid i \in T \} \cup \{ r_i \mid i \in T \} |",
        "sql_template": "SELECT COUNT(DISTINCT sender) FROM transactions WHERE dataset_id = :dataset_id AND status = :status_filter",
        "web3_template": """from web3 import Web3

w3 = Web3(Web3.HTTPProvider('{rpc_url}'))
active_wallets = set()
for b in range({start_block}, {end_block} + 1):
    block = w3.eth.get_block(b, full_transactions=True)
    for tx in block.transactions:
        active_wallets.add(tx['from'])
        if tx['to']:
            active_wallets.add(tx['to'])
print(f"Active Wallets: {len(active_wallets)}")""",
        "unit": "Wallets",
        "required_columns": "sender, receiver, status",
        "version": "1.2.0",
        "status": "VERIFIED"
    },
    {
        "metric_id": "UNIQ-SND-001",
        "canonical_name": "unique_senders",
        "display_name": "Unique Senders",
        "category": "User Engagement",
        "description": "Total count of unique originating Ethereum accounts that initiated transactions.",
        "formal_definition": "COUNT(DISTINCT sender)",
        "latex_formula": r"| \{ \text{sender}_i \mid i \in T \} |",
        "sql_template": "SELECT COUNT(DISTINCT sender) FROM transactions WHERE dataset_id = :dataset_id AND status = :status_filter",
        "web3_template": """from web3 import Web3

w3 = Web3(Web3.HTTPProvider('{rpc_url}'))
senders = set()
for b in range({start_block}, {end_block} + 1):
    block = w3.eth.get_block(b, full_transactions=True)
    for tx in block.transactions:
        senders.add(tx['from'])
print(f"Unique Senders: {len(senders)}")""",
        "unit": "Wallets",
        "required_columns": "sender, status",
        "version": "1.0.0",
        "status": "VERIFIED"
    },
    {
        "metric_id": "UNIQ-REC-001",
        "canonical_name": "unique_receivers",
        "display_name": "Unique Receivers",
        "category": "User Engagement",
        "description": "Total count of unique destination accounts or contracts receiving transfers or calls.",
        "formal_definition": "COUNT(DISTINCT receiver)",
        "latex_formula": r"| \{ \text{receiver}_i \mid i \in T \} |",
        "sql_template": "SELECT COUNT(DISTINCT receiver) FROM transactions WHERE dataset_id = :dataset_id AND receiver IS NOT NULL AND status = :status_filter",
        "web3_template": """from web3 import Web3

w3 = Web3(Web3.HTTPProvider('{rpc_url}'))
receivers = {tx['to'] for b in range({start_block}, {end_block} + 1) for tx in w3.eth.get_block(b, full_transactions=True).transactions if tx['to']}
print(f"Unique Receivers: {len(receivers)}")""",
        "unit": "Wallets",
        "required_columns": "receiver, status",
        "version": "1.0.0",
        "status": "VERIFIED"
    },
    {
        "metric_id": "GAS-TOT-001",
        "canonical_name": "total_gas_used",
        "display_name": "Gas Usage (Cumulative)",
        "category": "Network Telemetry",
        "description": "The total sum of computational effort (gas units) consumed by all transactions.",
        "formal_definition": "SUM(gas_used)",
        "latex_formula": r"\sum_{i=1}^N g_i",
        "sql_template": "SELECT COALESCE(SUM(gas_used), 0) FROM transactions WHERE dataset_id = :dataset_id AND status = :status_filter",
        "web3_template": """from web3 import Web3

w3 = Web3(Web3.HTTPProvider('{rpc_url}'))
total_gas = sum(tx['gas'] for b in range({start_block}, {end_block} + 1) for tx in w3.eth.get_block(b, full_transactions=True).transactions)
print(f"Total Gas Used: {total_gas}")""",
        "unit": "Gas",
        "required_columns": "gas_used, status",
        "version": "2.0.1",
        "status": "VERIFIED"
    },
    {
        "metric_id": "GAS-AVG-001",
        "canonical_name": "average_gas_used",
        "display_name": "Average Gas per Transaction",
        "category": "Network Telemetry",
        "description": "Mean computational units consumed per executed transaction.",
        "formal_definition": "AVG(gas_used)",
        "latex_formula": r"\frac{1}{N}\sum_{i=1}^N g_i",
        "sql_template": "SELECT COALESCE(AVG(gas_used), 0.0) FROM transactions WHERE dataset_id = :dataset_id AND status = :status_filter",
        "web3_template": """from web3 import Web3

w3 = Web3(Web3.HTTPProvider('{rpc_url}'))
gas_list = [tx['gas'] for b in range({start_block}, {end_block} + 1) for tx in w3.eth.get_block(b, full_transactions=True).transactions]
avg_gas = sum(gas_list) / len(gas_list) if gas_list else 0
print(f"Average Gas: {avg_gas:.2f}")""",
        "unit": "Gas",
        "required_columns": "gas_used, status",
        "version": "1.0.0",
        "status": "VERIFIED"
    },
    {
        "metric_id": "SC-CALLS-001",
        "canonical_name": "smart_contract_calls",
        "display_name": "Smart Contract Calls",
        "category": "DeFi & Protocols",
        "description": "The aggregate count of transactions interacting with deployed smart contracts (non-zero contract addresses or specific methods).",
        "formal_definition": "COUNT(id) WHERE contract_address IS NOT NULL",
        "latex_formula": r"\sum_{i=1}^N \mathbb{I}(\text{contract}_i \neq \emptyset)",
        "sql_template": "SELECT COUNT(id) FROM transactions WHERE dataset_id = :dataset_id AND contract_address IS NOT NULL AND status = :status_filter",
        "web3_template": """from web3 import Web3

w3 = Web3(Web3.HTTPProvider('{rpc_url}'))
contract_calls = 0
for b in range({start_block}, {end_block} + 1):
    block = w3.eth.get_block(b, full_transactions=True)
    for tx in block.transactions:
        if tx['to'] and w3.eth.get_code(tx['to']) != b'':
            contract_calls += 1
print(f"Smart Contract Calls: {contract_calls}")""",
        "unit": "Calls",
        "required_columns": "contract_address, status",
        "version": "1.1.0",
        "status": "VERIFIED"
    },
    {
        "metric_id": "DEX-VOL-001",
        "canonical_name": "dex_volume",
        "display_name": "DEX Swap Volume",
        "category": "DeFi & Protocols",
        "description": "Total value swapped across decentralized exchange liquidity pools.",
        "formal_definition": "SUM(value) WHERE transaction_type = 'Swap'",
        "latex_formula": r"\sum_{i \in \text{Swaps}} v_i",
        "sql_template": "SELECT COALESCE(SUM(value), 0.0) FROM transactions WHERE dataset_id = :dataset_id AND transaction_type = 'Swap' AND status = :status_filter",
        "web3_template": """# Web3.py DEX Swap volume filter
# Filters Transfer & Swap events on Uniswap V3 Pool
from web3 import Web3
w3 = Web3(Web3.HTTPProvider('{rpc_url}'))
# Filter Swap events
""",
        "unit": "ETH",
        "required_columns": "value, transaction_type, status",
        "version": "0.9.beta",
        "status": "DRAFT"
    },
    {
        "metric_id": "ERC20-TX-001",
        "canonical_name": "token_transfers",
        "display_name": "ERC-20 Token Transfers",
        "category": "Tokens",
        "description": "Total count of standard ERC-20 token transfer events logged.",
        "formal_definition": "COUNT(id) WHERE method_name = 'transfer'",
        "latex_formula": r"\sum_{i=1}^N \mathbb{I}(\text{method}_i = \text{'transfer'})",
        "sql_template": "SELECT COUNT(id) FROM transactions WHERE dataset_id = :dataset_id AND method_name = 'transfer' AND status = :status_filter",
        "web3_template": """from web3 import Web3
# Transfer event signature keccak('Transfer(address,address,uint256)')
""",
        "unit": "Transfers",
        "required_columns": "method_name, status",
        "version": "1.0.0",
        "status": "VERIFIED"
    }
]
