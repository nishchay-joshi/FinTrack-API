from datetime import datetime, timedelta

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.enums import TransactionType, AnalyticsRange
from app.models.transaction_model import Transaction
from app.models.user_model import User
from app.schemas.analytics_schema import LargestExpense, LargestIncome, MostActiveDay, IncomeExpenseBucket


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


async def get_savings_rate(
    current_user: User,
    start_date: datetime,
    end_date: datetime,
    db: AsyncSession,
):
    result = await db.execute(select(
            func.coalesce(func.sum(Transaction.amount), 0)
        ).where(
            Transaction.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.INCOME,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        )
    )

    total_income = result.scalar_one()

    result = await db.execute(
        select(func.coalesce(func.sum(Transaction.amount), 0)
        ).where(Transaction.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.EXPENSE,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        )
    )

    total_expense = result.scalar_one()

    if total_income == 0:
        return 0

    savings = total_income - total_expense

    return round((savings / total_income) * 100, 2)


async def get_average_daily_spend(
    current_user: User,
    start_date: datetime,
    end_date: datetime,
    db: AsyncSession,
):
    result = await db.execute(
        select(func.coalesce(func.sum(Transaction.amount), 0)
        ).where(Transaction.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.EXPENSE,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        )
    )

    total_expense = result.scalar_one()

    total_days = (end_date.date() - start_date.date()).days + 1

    if total_days <= 0:
        return 0

    return round(total_expense / total_days, 2)


async def get_largest_expense(
    current_user: User,
    start_date: datetime,
    end_date: datetime,
    db: AsyncSession,
):
    result = await db.execute(
        select(Transaction)
        .where(Transaction.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.EXPENSE,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        ).order_by(Transaction.amount.desc()).limit(1)
    )

    transaction = result.scalars().first()

    if not transaction:
        return LargestExpense(amount=0, note=None)

    return LargestExpense(
        amount=transaction.amount,
        note=transaction.note,
    )


async def get_largest_income(
    current_user: User,
    start_date: datetime,
    end_date: datetime,
    db: AsyncSession,
):
    result = await db.execute(
        select(Transaction)
        .where(Transaction.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.INCOME,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        ).order_by(Transaction.amount.desc()
        ).limit(1)
    )

    transaction = result.scalars().first()

    if not transaction:
        return LargestIncome(
            largest_income=0,
            largest_income_note=None,
        )

    return LargestIncome(
        largest_income=transaction.amount,
        largest_income_note=transaction.note,
    )


async def get_expense_transaction_count(
    current_user: User,
    start_date: datetime,
    end_date: datetime,
    db: AsyncSession,
):
    result = await db.execute(
        select(func.count(Transaction.id)
        ).where(Transaction.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.EXPENSE,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        )
    )

    return result.scalar_one()


async def get_most_active_spending_day(
    current_user: User,
    start_date: datetime,
    end_date: datetime,
    db: AsyncSession,
):
    result = await db.execute(
        select(
            func.date(Transaction.timestamp).label("day"),
            func.count(Transaction.id).label("count"),
        ).where(Transaction.user_id == current_user.id,
            Transaction.transaction_type == TransactionType.EXPENSE,
            Transaction.timestamp >= start_date,
            Transaction.timestamp <= end_date,
        ).group_by(func.date(Transaction.timestamp)
        ).order_by(func.count(Transaction.id).desc()
        ).limit(1)
    )

    row = result.first()

    if not row:
        return MostActiveDay(
            day="None",
            transaction_count=0,
        )

    return MostActiveDay(
        day=str(row.day),
        transaction_count=row.count,
    )


async def get_income_vs_expense(
        current_user: User,
        analytics_range: AnalyticsRange,
        start_date: datetime,
        end_date: datetime,
        db: AsyncSession,
):
    if analytics_range == AnalyticsRange.LAST_7_DAYS:
        result = await db.execute(
            select(
                func.date(Transaction.timestamp).label("day"),
                Transaction.transaction_type,
                func.sum(Transaction.amount).label("total"),
            )
            .where(
                Transaction.user_id == current_user.id,
                Transaction.timestamp >= start_date,
                Transaction.timestamp <= end_date,
            )
            .group_by(
                func.date(Transaction.timestamp),
                Transaction.transaction_type,
            )
        )

        rows = result.all()

        lookup = {}

        for row in rows:
            lookup.setdefault(row.day, {})
            lookup[row.day][row.transaction_type] = float(row.total)

        bars = []

        current_day = start_date.date()

        while current_day <= end_date.date():
            values = lookup.get(current_day, {})
            bars.append(
                IncomeExpenseBucket(
                    label=current_day.strftime("%a"),
                    income=values.get(TransactionType.INCOME, 0),
                    expense=values.get(TransactionType.EXPENSE, 0)
                )
            )
            current_day += timedelta(days=1)

        return bars
    elif analytics_range == AnalyticsRange.LAST_30_DAYS:
        result = await db.execute(
            select(
                Transaction.timestamp,
                Transaction.transaction_type,
                Transaction.amount,
            )
            .where(
                Transaction.user_id == current_user.id,
                Transaction.timestamp >= start_date,
                Transaction.timestamp <= end_date,
            )
        )

        transactions = result.all()
        total_days = (end_date.date() - start_date.date()).days + 1
        bucket_size = total_days // 4
        remainder = total_days % 4
        bucket_lengths = []

        for i in range(4):
            if i < remainder:
                bucket_lengths.append(bucket_size + 1)
            else:
                bucket_lengths.append(bucket_size)

        buckets = []

        current_start = start_date.date()

        for length in bucket_lengths:
            current_end = current_start + timedelta(days=length - 1)
            income = 0
            expense = 0

            for transaction in transactions:
                transaction_date = transaction.timestamp.date()
                if current_start <= transaction_date <= current_end:
                    if transaction.transaction_type == TransactionType.INCOME:
                        income += float(transaction.amount)
                    elif transaction.transaction_type == TransactionType.EXPENSE:
                        expense += float(transaction.amount)

            buckets.append(
                IncomeExpenseBucket(
                    label=f"{current_start.strftime('%d %b')} - {current_end.strftime('%d %b')}",
                    income=income,
                    expense=expense,
                )
            )

            current_start = current_end + timedelta(days=1)

        return buckets
    elif analytics_range == AnalyticsRange.LAST_90_DAYS:
        result = await db.execute(
            select(
                Transaction.timestamp,
                Transaction.transaction_type,
                Transaction.amount,
            )
            .where(
                Transaction.user_id == current_user.id,
                Transaction.timestamp >= start_date,
                Transaction.timestamp <= end_date,
            )
        )

        transactions = result.all()
        total_days = (end_date.date() - start_date.date()).days + 1
        bucket_size = total_days // 4
        remainder = total_days % 4
        bucket_lengths = []

        for i in range(4):
            if i < remainder:
                bucket_lengths.append(bucket_size + 1)
            else:
                bucket_lengths.append(bucket_size)

        buckets = []

        current_start = start_date.date()

        for length in bucket_lengths:
            current_end = current_start + timedelta(days=length - 1)
            income = 0
            expense = 0
            for transaction in transactions:
                transaction_date = transaction.timestamp.date()
                if current_start <= transaction_date <= current_end:
                    if transaction.transaction_type == TransactionType.INCOME:
                        income += float(transaction.amount)
                    elif transaction.transaction_type == TransactionType.EXPENSE:
                        expense += float(transaction.amount)

            buckets.append(
                IncomeExpenseBucket(
                    label=f"{current_start.strftime('%d %b')} - {current_end.strftime('%d %b')}",
                    income=income,
                    expense=expense,
                )
            )

            current_start = current_end + timedelta(days=1)

        return buckets
    elif analytics_range == AnalyticsRange.LAST_YEAR:
        result = await db.execute(
            select(
                Transaction.timestamp,
                Transaction.transaction_type,
                Transaction.amount,
            )
            .where(
                Transaction.user_id == current_user.id,
                Transaction.timestamp >= start_date,
                Transaction.timestamp <= end_date,
            )
        )

        transactions = result.all()
        quarters = [
            ("Q1", 1, 3),
            ("Q2", 4, 6),
            ("Q3", 7, 9),
            ("Q4", 10, 12),
        ]

        buckets = []

        for label, start_month, end_month in quarters:
            income = 0
            expense = 0
            for transaction in transactions:
                month = transaction.timestamp.month
                if start_month <= month <= end_month:
                    if transaction.transaction_type == TransactionType.INCOME:
                        income += float(transaction.amount)
                    elif transaction.transaction_type == TransactionType.EXPENSE:
                        expense += float(transaction.amount)
            buckets.append(
                IncomeExpenseBucket(
                    label=label,
                    income=income,
                    expense=expense,
                )
            )

        return buckets

    return []