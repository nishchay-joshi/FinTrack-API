from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.transaction_model import Transaction
from app.models.wallet_model import Wallet
from app.models.category_model import Category
from app.models.user_model import User
from app.schemas.transaction_schema import TransactionCreate


async def create_transaction(transaction_data: TransactionCreate, current_user: User, db: AsyncSession):
    result = await db.execute(
        select(Wallet).where(Wallet.id == transaction_data.wallet_id,
                             Wallet.user_id == current_user.id)
    )

    wallet = result.scalars().first()

    if not wallet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Wallet not found")

    result = await db.execute(
        select(Category).where(Category.id == transaction_data.category_id,
                               Category.user_id == current_user.id)
    )

    category = result.scalars().first()

    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    if transaction_data.transaction_type == "income":
        wallet.balance += transaction_data.amount
    else:
        if transaction_data.amount <= wallet.balance:
            wallet.balance -= transaction_data.amount
        else:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Insufficient funds")

    new_transaction = Transaction(
        user_id=current_user.id,
        wallet_id=transaction_data.wallet_id,
        category_id=transaction_data.category_id,
        amount=transaction_data.amount,
        transaction_type=transaction_data.transaction_type,
        note=transaction_data.note,
    )

    db.add(new_transaction)
    await db.commit()
    await db.refresh(new_transaction)

    return new_transaction


async def get_transactions(current_user: User, db: AsyncSession):
    result = await db.execute(
        select(Transaction).where(Transaction.user_id == current_user.id)
    )

    transactions = result.scalars().all()

    return transactions

