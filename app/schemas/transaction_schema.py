from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class TransactionCreate(BaseModel):
    wallet_id: int
    category_id: int
    amount: float = Field(gt=0)
    transaction_type: Literal["income", "expense"]
    note: str | None = None


class TransactionResponse(TransactionCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    timestamp: datetime


class TransactionUpdate(BaseModel):
    wallet_id: int | None = None
    category_id: int | None = None
    amount: float | None = None
    transaction_type: Literal["income", "expense"] | None = None
    note: str | None = None
