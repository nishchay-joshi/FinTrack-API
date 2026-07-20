from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import uuid

from app.models.transaction_model import Transaction
from app.models.wallet_model import Wallet
from app.models.category_model import Category
from app.models.user_model import User
from app.schemas.transaction_schema import TransactionCreate, TransactionUpdate, TransferCreate
from app.models.enums import TransactionType


async def _get_wallet(wallet_id: int, current_user: User, db: AsyncSession):
    result = await db.execute(
        select(Wallet).where(Wallet.id == wallet_id,
            Wallet.user_id == current_user.id)
    )

    wallet = result.scalars().first()

    if not wallet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wallet not found",
        )

    return wallet


async def create_transaction(
    transaction_data: TransactionCreate,
    current_user: User,
    db: AsyncSession,
):

    wallet = await _get_wallet(
        transaction_data.wallet_id,
        current_user,
        db,
    )

    result = await db.execute(
        select(Category).where(
            Category.id == transaction_data.category_id,
            Category.user_id == current_user.id,
        )
    )

    category = result.scalars().first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    if transaction_data.transaction_type == TransactionType.INCOME:
        wallet.balance += transaction_data.amount
    elif transaction_data.transaction_type == TransactionType.EXPENSE:
        if transaction_data.category_id is None:
            raise HTTPException(
                status_code=400,
                detail="Expense transactions require a category.",
            )
        if wallet.balance < transaction_data.amount:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Insufficient wallet balance.",
            )
        wallet.balance -= transaction_data.amount
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Transfers must be created using the transfer endpoint.",
        )
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

    final_wallet = await _get_wallet(
        final_wallet_id,
        current_user,
        db,
    )

    if final_transaction_type == TransactionType.EXPENSE:
        if final_category_id is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Expense transactions require a category.",
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

    elif final_transaction_type == TransactionType.INCOME:
        if final_category_id is not None:
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

    old_wallet = await _get_wallet(
        transaction.wallet_id,
        current_user,
        db,
    )

    if transaction.transaction_type == TransactionType.INCOME:
        old_wallet.balance -= transaction.amount
    elif transaction.transaction_type == TransactionType.EXPENSE:
        old_wallet.balance += transaction.amount
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Transfer transactions cannot be edited using this endpoint.",
        )

    if final_transaction_type == TransactionType.EXPENSE:
        if final_wallet.balance < final_amount:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Insufficient wallet balance.",
            )

    if final_transaction_type == TransactionType.INCOME:
        final_wallet.balance += final_amount
    elif final_transaction_type == TransactionType.EXPENSE:
        final_wallet.balance -= final_amount
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Transfers must be updated using the transfer endpoint.",
        )

    for field, value in updated_fields.items():
        setattr(transaction, field, value)

    await db.commit()
    await db.refresh(transaction)

    return transaction


async def create_transfer(
    transfer_data: TransferCreate,
    current_user: User,
    db: AsyncSession,
):
    source_wallet = await _get_wallet(
        transfer_data.source_wallet_id,
        current_user,
        db,
    )

    destination_wallet = await _get_wallet(
        transfer_data.destination_wallet_id,
        current_user,
        db,
    )

    if source_wallet.id == destination_wallet.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Source and destination wallets must be different.",
        )

    if source_wallet.balance < transfer_data.amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient wallet balance.",
        )

    transfer_group_id = str(uuid.uuid4())

    source_wallet.balance -= transfer_data.amount
    destination_wallet.balance += transfer_data.amount

    source_transaction = Transaction(
        user_id=current_user.id,
        wallet_id=source_wallet.id,
        category_id=None,
        amount=transfer_data.amount,
        transaction_type=TransactionType.TRANSFER,
        transfer_group_id=transfer_group_id,
        note=transfer_data.note,
    )

    destination_transaction = Transaction(
        user_id=current_user.id,
        wallet_id=destination_wallet.id,
        category_id=None,
        amount=transfer_data.amount,
        transaction_type=TransactionType.TRANSFER,
        transfer_group_id=transfer_group_id,
        note=transfer_data.note,
    )

    db.add(source_transaction)
    db.add(destination_transaction)
    await db.commit()
    await db.refresh(source_transaction)
    await db.refresh(destination_transaction)

    return source_transaction, destination_transaction
