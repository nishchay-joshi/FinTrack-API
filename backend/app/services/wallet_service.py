from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.models.wallet_model import Wallet
from app.models.user_model import User
from app.schemas.wallet_schema import WalletCreate, WalletUpdate


async def create_wallet(
    wallet_data: WalletCreate,
    current_user: User,
    db: AsyncSession,
):

    result = await db.execute(
        select(Wallet).where(
            Wallet.user_id == current_user.id,
            func.lower(Wallet.name) == func.lower(wallet_data.name),
        )
    )
    existing_named_wallet = result.scalars().first()

    if existing_named_wallet:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Wallet with that name already exists",
        )


    new_wallet = Wallet(
        user_id=current_user.id,
        name=wallet_data.name,
        description=wallet_data.description,
        balance=0,
    )

    db.add(new_wallet)
    await db.commit()
    await db.refresh(new_wallet)

    return new_wallet


async def get_all_wallets(user: User, db: AsyncSession):
    result = await db.execute(
        select(Wallet).where(Wallet.user_id == user.id)
    )

    wallets_list = result.scalars().all()

    return wallets_list


async def get_wallet(wallet_id: int, current_user: User, db: AsyncSession):
    result = await db.execute(
        select(Wallet).where(Wallet.id == wallet_id,
                             Wallet.user_id == current_user.id)
    )

    wallet = result.scalars().first()

    if not wallet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Wallet not found")

    return wallet


async def delete_wallet(wallet_id: int, current_user: User, db: AsyncSession):
    result = await db.execute(
        select(Wallet).where(Wallet.id == wallet_id,
                             Wallet.user_id == current_user.id)
    )

    wallet = result.scalars().first()

    if not wallet:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Wallet not found")

    await db.delete(wallet)
    await db.commit()


async def update_wallet(
    wallet_id: int,
    wallet_data: WalletUpdate,
    current_user: User,
    db: AsyncSession,
):
    result = await db.execute(
        select(Wallet).where(
            Wallet.id == wallet_id,
            Wallet.user_id == current_user.id,
        )
    )

    wallet = result.scalars().first()

    if not wallet:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Wallet not found",
        )

    updated_fields = wallet_data.model_dump(exclude_unset=True)

    if not updated_fields:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No data sent.",
        )

    for field, value in updated_fields.items():
        setattr(wallet, field, value)

    await db.commit()
    await db.refresh(wallet)

    return wallet



