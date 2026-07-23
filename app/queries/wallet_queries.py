from datetime import datetime

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.transaction_model import Transaction
from app.models.user_model import User
from app.models.wallet_model import Wallet
from app.schemas.analytics_schema import MostUsedWallet


async def get_total_balance(current_user: User, db: AsyncSession):
    result = await db.execute(select(func.coalesce(func.sum(Wallet.balance), 0)
        ).where(Wallet.user_id == current_user.id)
    )

    return result.scalar_one()


async def get_wallet_count(current_user: User, db: AsyncSession):
    result = await db.execute(
        select(func.count(Wallet.id)
        ).where(Wallet.user_id == current_user.id)
    )

    return result.scalar_one()


async def get_most_used_wallet(
    current_user: User,
    start_date: datetime,
    end_date: datetime,
    db: AsyncSession,
):
    result = await db.execute(
        select(Wallet.name, func.count(Transaction.id).label("count")
        ).join(Transaction, Transaction.wallet_id == Wallet.id
        ).where(Wallet.user_id == current_user.id,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        ).group_by(Wallet.id).order_by(func.count(Transaction.id).desc()
        ).limit(1)
    )

    row = result.first()

    if not row:
        return MostUsedWallet(
            name="None",
            transaction_count=0,
        )

    return MostUsedWallet(
        name=row.name,
        transaction_count=row.count,
    )