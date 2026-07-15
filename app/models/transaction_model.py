from __future__ import annotations
from datetime import UTC, datetime

from sqlalchemy import DateTime, Integer, String, Float, ForeignKey, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base
from app.models.enums import TransactionType

class Transaction(Base):
    __tablename__ = "transactions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )
    wallet_id: Mapped[int] = mapped_column(
        ForeignKey("wallets.id"),
        nullable=False,
        index=True,
    )
    category_id: Mapped[int] = mapped_column(
        ForeignKey("categories.id"),
        nullable=False,
        index=True,
    )
    amount: Mapped[float] = mapped_column(Float, nullable=False)

    transaction_type: Mapped[TransactionType] = mapped_column(
        Enum(TransactionType,
            values_callable=lambda enum: [e.value for e in enum],
            name="transaction_type_enum"),
        nullable=False,
    )
    transfer_group_id: Mapped[str | None] = mapped_column(
        String(36),
        nullable=True,
    )
    note: Mapped[str | None] = mapped_column(String(50), nullable=True, default=None)

    user: Mapped["User"] = relationship(back_populates="transactions")
    wallet: Mapped["Wallet"] = relationship(back_populates="transactions")
    category: Mapped["Category"] = relationship(back_populates="transactions")

    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
    )