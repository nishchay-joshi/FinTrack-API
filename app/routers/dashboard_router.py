from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth import CurrentUser
from app.database.session import get_db
from app.schemas.dashboard_schema import DashboardResponse, DashboardSummary
from app.queries.wallet_queries import get_total_balance, get_wallet_count
from app.queries.transaction_queries import get_total_income, get_total_expense, get_transaction_count, get_recent_transactions
from app.services.wallet_service import get_all_wallets


router = APIRouter()


@router.get("/", response_model=DashboardResponse)
async def get_dashboard(current_user: CurrentUser, db: AsyncSession = Depends(get_db)):
    summary = DashboardSummary(
        total_balance=await get_total_balance(
            current_user,
            db,
        ),
        total_income=await get_total_income(
            current_user,
            db,
        ),
        total_expense=await get_total_expense(
            current_user,
            db,
        ),
        total_transactions=await get_transaction_count(
            current_user,
            db,
        ),
        total_wallets=await get_wallet_count(
            current_user,
            db,
        )
    )

    wallets = await get_all_wallets(
        current_user,
        db,
    )

    recent_transactions = await get_recent_transactions(
        current_user,
        db,
    )

    return DashboardResponse(
        summary=summary,
        wallets=wallets,
        recent_transactions=recent_transactions,
    )