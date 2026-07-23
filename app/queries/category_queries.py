from datetime import datetime

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import User
from app.models.category_model import Category
from app.models.enums import TransactionType
from app.models.transaction_model import Transaction
from app.schemas.analytics_schema import TopCategory, CategoryBreakdown, MostFrequentCategory


async def get_top_category(
    current_user: User,
    start_date: datetime,
    end_date: datetime,
    db: AsyncSession,
):
    total_result = await db.execute(
        select(func.coalesce(func.sum(Transaction.amount), 0)
        ).where(Transaction.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.EXPENSE,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        )
    )

    total_expense = total_result.scalar_one()

    result = await db.execute(
        select(Category.name, func.sum(Transaction.amount).label("amount"),
        ).join(Transaction, Transaction.category_id == Category.id,
        ).where(Category.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.EXPENSE,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        ).group_by(Category.id).order_by(
            func.sum(Transaction.amount).desc(),
        ).limit(1)
    )

    row = result.first()

    if not row:
        return TopCategory(
            name="None",
            amount=0,
            percentage=0,
        )

    percentage = 0

    if total_expense > 0:
        percentage = round((row.amount / total_expense) * 100, 2)

    return TopCategory(
        name=row.name,
        amount=row.amount,
        percentage=percentage,
    )


async def get_category_breakdown(
    current_user: User,
    start_date: datetime,
    end_date: datetime,
    db: AsyncSession,
):
    total_result = await db.execute(
        select(func.coalesce(func.sum(Transaction.amount), 0)
        ).where(Transaction.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.EXPENSE,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        )
    )

    total_expense = total_result.scalar_one()

    result = await db.execute(
        select(Category.name, func.sum(Transaction.amount).label("amount"),
        ).join(Transaction, Transaction.category_id == Category.id,
        ).where(Category.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.EXPENSE,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        ).group_by(Category.id)
        .order_by(func.sum(Transaction.amount).desc())
    )

    rows = result.all()

    breakdown = []

    for row in rows:
        percentage = 0
        if total_expense > 0:
            percentage = round((row.amount / total_expense) * 100, 2)
        breakdown.append(
            CategoryBreakdown(
                name=row.name,
                amount=row.amount,
                percentage=percentage,
            )
        )

    return breakdown


async def get_most_frequent_category(
    current_user: User,
    start_date: datetime,
    end_date: datetime,
    db: AsyncSession,
):
    result = await db.execute(
        select(Category.name, func.count(Transaction.id).label("count"),
        ).join(Transaction, Transaction.category_id == Category.id,
        ).where(Category.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.EXPENSE,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        ).group_by(Category.id)
        .order_by(func.count(Transaction.id).desc(),
        ).limit(1)
    )

    row = result.first()

    if not row:
        return MostFrequentCategory(
            name="None",
            transaction_count=0,
        )

    return MostFrequentCategory(
        name=row.name,
        transaction_count=row.count,
    )