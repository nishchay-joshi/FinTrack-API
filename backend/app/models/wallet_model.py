from __future__ import annotations
from datetime import UTC, datetime

from sqlalchemy import DateTime, Integer, String, ForeignKey, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base

class Wallet(Base):
    __tablename__ = "wallets"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    balance: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    description: Mapped[str] = mapped_column(String(100), nullable=True)
    user: Mapped["User"] = relationship(back_populates="wallets")
    transactions: Mapped[list["Transaction"]] = relationship(back_populates="wallet")

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
    )