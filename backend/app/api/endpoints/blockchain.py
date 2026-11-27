from fastapi import APIRouter
from app.blockchain.web3_service import BlockchainService

router = APIRouter()

@router.get("/status")
def get_blockchain_status():
    return BlockchainService.get_connection_status()

@router.get("/latest-block")
def get_latest_block():
    data = BlockchainService.get_latest_block_data()
    if data:
        return data
    return {
        "status": "Offline / Fallback",
        "message": "Local blockchain node (Ganache) not detected. Using database transaction state."
    }
