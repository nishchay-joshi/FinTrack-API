from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.enums import TransactionType


class TransactionCreate(BaseModel):
    wallet_id: int
    category_id: int | None
    amount: float = Field(gt=0)
    transaction_type: TransactionType
    note: str | None = None


class TransactionResponse(TransactionCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    timestamp: datetime


class TransactionUpdate(BaseModel):
    wallet_id: int | None = None
    category_id: int | None = None
    amount: float | None = None
    transaction_type: TransactionType | None = None
    note: str | None = None


class TransferCreate(BaseModel):
    source_wallet_id: int
    destination_wallet_id: int
    amount: float = Field(gt=0)
    note: str | None = None