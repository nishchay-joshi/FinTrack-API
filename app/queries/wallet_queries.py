from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user_model import User
from app.models.wallet_model import Wallet


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

