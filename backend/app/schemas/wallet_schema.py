from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class WalletCreate(BaseModel):
    name: str = Field(min_length=1, max_length=50)
    description: str = Field(min_length=1, max_length=50)


class WalletResponse(WalletCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    balance: float
    created_at: datetime


class WalletUpdate(BaseModel):
    name: str | None = None
    description: str | None = None