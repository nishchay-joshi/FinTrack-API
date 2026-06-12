from typing import Annotated
from fastapi import APIRouter, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.transaction_schema import TransactionCreate, TransactionUpdate, TransactionResponse
from app.services.transaction_service import create_transaction, get_transactions, update_transaction
from app.core.auth import CurrentUser

router = APIRouter()


@router.post("/", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED)
async def create_transaction_endpoint(transaction_data: TransactionCreate,
                                      current_user: CurrentUser,
                                      db: Annotated[AsyncSession, Depends(get_db)]):
    transaction = await create_transaction(transaction_data, current_user, db)
    return transaction


@router.get("/", response_model=list[TransactionResponse], status_code=status.HTTP_200_OK)
async def get_all_transactions(user: CurrentUser, db: Annotated[AsyncSession, Depends(get_db)]):
    transactions = await get_transactions(user, db)
    return transactions


@router.patch("/{transaction_id}", response_model=TransactionResponse, status_code=status.HTTP_200_OK)
async def update_transaction_endpoint(transaction_id: int,
                                      transaction_data: TransactionUpdate,
                                      current_user: CurrentUser,
                                      db: Annotated[AsyncSession, Depends(get_db)]):
    updated_transaction = await update_transaction(transaction_id, transaction_data, current_user, db)
    return updated_transaction