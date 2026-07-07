from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.transaction_model import Transaction
from app.models.wallet_model import Wallet
from app.models.category_model import Category
from app.models.user_model import User
from app.schemas.transaction_schema import TransactionCreate, TransactionUpdate


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
        wallet.balance -= transaction_data.amount

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


async def update_transaction(
    transaction_id: int,
    transaction_data: TransactionUpdate,
    current_user: User,
    db: AsyncSession,
):
    result = await db.execute(
        select(Transaction).where(
            Transaction.id == transaction_id,
            Transaction.user_id == current_user.id,
        )
    )

    transaction = result.scalars().first()

    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found",
        )

    updated_fields = transaction_data.model_dump(exclude_unset=True)

    if not updated_fields:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No data sent",
        )

    final_wallet_id = updated_fields.get(
        "wallet_id",
        transaction.wallet_id,
    )

    final_category_id = updated_fields.get(
        "category_id",
        transaction.category_id,
    )

    final_amount = updated_fields.get(
        "amount",
        transaction.amount,
    )

    final_transaction_type = updated_fields.get(
        "transaction_type",
        transaction.transaction_type,
    )

    final_note = updated_fields.get(
        "note",
        transaction.note,
    )

    result = await db.execute(
        select(Wallet).where(
            Wallet.id == final_wallet_id,
            Wallet.user_id == current_user.id,
        )
    )

    final_wallet = result.scalars().first()

    if not final_wallet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wallet not found",
        )

    result = await db.execute(
        select(Category).where(
            Category.id == final_category_id,
            Category.user_id == current_user.id,
        )
    )

    final_category = result.scalars().first()

    if not final_category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    result = await db.execute(
        select(Wallet).where(
            Wallet.id == transaction.wallet_id,
            Wallet.user_id == current_user.id,
        )
    )

    old_wallet = result.scalars().first()

    if transaction.transaction_type == "income":
        old_wallet.balance -= transaction.amount
    else:
        old_wallet.balance += transaction.amount

    if final_transaction_type == "income":
        final_wallet.balance += final_amount
    else:
        final_wallet.balance -= final_amount

    for field, value in updated_fields.items():
        setattr(transaction, field, value)

    await db.commit()
    await db.refresh(transaction)

    return transaction
