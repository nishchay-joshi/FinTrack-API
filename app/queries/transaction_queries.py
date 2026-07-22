from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.enums import TransactionType
from app.models.transaction_model import Transaction
from app.models.user_model import User


async def get_total_income(current_user: User, db: AsyncSession):
    result = await db.execute(
        select(func.coalesce(func.sum(Transaction.amount), 0)
        ).where(
            Transaction.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.INCOME,
        )
    )

    return result.scalar_one()


async def get_total_expense(current_user: User, db: AsyncSession):
    result = await db.execute(
        select(func.coalesce(func.sum(Transaction.amount), 0)
        ).where(
            Transaction.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.EXPENSE,
        )
    )

    return result.scalar_one()


async def get_transaction_count(current_user: User, db: AsyncSession):
    result = await db.execute(
        select(func.count(Transaction.id)
        ).where(Transaction.user_id == current_user.id)
    )

    return result.scalar_one()


async def get_recent_transactions(
    current_user: User,
    db: AsyncSession,
    limit: int = 5,
):
    result = await db.execute(
        select(Transaction).where(
            Transaction.user_id == current_user.id,
        ).order_by(
            Transaction.timestamp.desc(),
        ).limit(limit)
    )

    return result.scalars().all()