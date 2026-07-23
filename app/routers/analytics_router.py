from datetime import UTC, datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth import CurrentUser
from app.database.session import get_db
from app.models.enums import AnalyticsRange
from app.schemas.analytics_schema import AnalyticsInsights, AnalyticsResponse, AnalyticsSummary
from app.queries.wallet_queries import get_most_used_wallet
from app.queries.category_queries import get_category_breakdown, get_most_frequent_category, get_top_category
from app.queries.transaction_queries import (
    get_average_daily_spend,
    get_expense_transaction_count,
    get_income_vs_expense,
    get_largest_expense,
    get_largest_income,
    get_most_active_spending_day,
    get_savings_rate,
)

router = APIRouter()


@router.get("/", response_model=AnalyticsResponse)
async def get_analytics(
    current_user: CurrentUser,
    analytics_range: AnalyticsRange = AnalyticsRange.LAST_30_DAYS,
    db: AsyncSession = Depends(get_db),
):
    end_date = datetime.now(UTC)
    if analytics_range == AnalyticsRange.LAST_7_DAYS:
        start_date = end_date - timedelta(days=6)
    elif analytics_range == AnalyticsRange.LAST_30_DAYS:
        start_date = end_date - timedelta(days=29)
    elif analytics_range == AnalyticsRange.LAST_90_DAYS:
        start_date = end_date - timedelta(days=89)
    else:
        start_date = datetime(end_date.year,1,1,tzinfo=UTC)

    summary = AnalyticsSummary(
        savings_rate=await get_savings_rate(
            current_user,
            start_date,
            end_date,
            db,
        ),
        average_daily_spend=await get_average_daily_spend(
            current_user,
            start_date,
            end_date,
            db,
        ),
        largest_expense=await get_largest_expense(
            current_user,
            start_date,
            end_date,
            db,
        ),
        top_category=await get_top_category(
            current_user,
            start_date,
            end_date,
            db,
        ),
    )

    insights = AnalyticsInsights(
        most_used_wallet=await get_most_used_wallet(
            current_user,
            start_date,
            end_date,
            db,
        ),
        most_active_spending_day=await get_most_active_spending_day(
            current_user,
            start_date,
            end_date,
            db,
        ),
        largest_income=await get_largest_income(
            current_user,
            start_date,
            end_date,
            db,
        ),
        expense_transaction_count=await get_expense_transaction_count(
            current_user,
            start_date,
            end_date,
            db,
        ),
        most_frequent_category=await get_most_frequent_category(
            current_user,
            start_date,
            end_date,
            db,
        ),
    )

    return AnalyticsResponse(
        summary=summary,
        income_vs_expense=await get_income_vs_expense(
            current_user,
            analytics_range,
            start_date,
            end_date,
            db,
        ),
        category_breakdown=await get_category_breakdown(
            current_user,
            start_date,
            end_date,
            db,
        ),
        insights=insights,
    )
