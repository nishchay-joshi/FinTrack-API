from datetime import datetime
from pydantic import BaseModel, ConfigDict

from app.models.enums import TransactionType
from app.schemas.wallet_schema import WalletResponse
from app.schemas.transaction_schema import TransactionResponse


class DashboardSummary(BaseModel):
    total_balance: float
    total_income: float
    total_expense: float
    total_transactions: int
    total_wallets: int


class RecentTransaction(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    wallet_id: int
    category_id: int | None
    amount: float
    transaction_type: TransactionType
    note: str | None
    created_at: datetime


class DashboardResponse(BaseModel):
    summary: DashboardSummary
    wallets: list[WalletResponse]
    recent_transactions: list[TransactionResponse]