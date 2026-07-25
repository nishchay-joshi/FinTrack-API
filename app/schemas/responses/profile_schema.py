from datetime import datetime

from pydantic import BaseModel


class ProfileResponse(BaseModel):
    name: str
    email: str
    joined_at: datetime
    wallet_count: int
    category_count: int
    transaction_count: int
