from web3 import Web3
from typing import Dict, Any, Optional
from app.core.config import settings

class BlockchainService:
    """
    Manages Web3 connection to local Ganache or Ethereum RPC nodes.
    Gracefully falls back to offline status without crashing the system.
    """

    @classmethod
    def get_connection_status(cls, rpc_url: Optional[str] = None) -> Dict[str, Any]:
        url = rpc_url or settings.GANACHE_RPC_URL
        try:
            w3 = Web3(Web3.HTTPProvider(url, request_kwargs={"timeout": 2}))
            is_connected = w3.is_connected()
            if is_connected:
                latest_block_num = w3.eth.block_number
                chain_id = w3.eth.chain_id
                gas_price_wei = w3.eth.gas_price
                gas_price_gwei = float(w3.from_wei(gas_price_wei, 'gwei'))
                return {
                    "is_connected": True,
                    "status": "Connected",
                    "rpc_url": url,
                    "latest_block": latest_block_num,
                    "chain_id": chain_id,
                    "gas_price_gwei": gas_price_gwei,
                    "client_version": w3.client_version
                }
            else:
                return {
                    "is_connected": False,
                    "status": "Not Connected",
                    "rpc_url": url,
                    "message": "Ganache RPC endpoint unreachable (Offline fallback active)."
                }
        except Exception as e:
            return {
                "is_connected": False,
                "status": "Not Connected",
                "rpc_url": url,
                "error": str(e),
                "message": "Ganache is offline. Using local verified dataset."
            }

    @classmethod
    def get_latest_block_data(cls, rpc_url: Optional[str] = None) -> Optional[Dict[str, Any]]:
        url = rpc_url or settings.GANACHE_RPC_URL
        try:
            w3 = Web3(Web3.HTTPProvider(url, request_kwargs={"timeout": 2}))
            if not w3.is_connected():
                return None
            latest_block = w3.eth.get_block("latest", full_transactions=True)
            return {
                "number": latest_block.number,
                "hash": latest_block.hash.hex(),
                "timestamp": latest_block.timestamp,
                "tx_count": len(latest_block.transactions),
                "gas_used": latest_block.gasUsed,
                "gas_limit": latest_block.gasLimit
            }
        except Exception:
            return None
