"""rename wallet_type to description

Revision ID: bf40a4e7aeb1
Revises:
Create Date: 2026-07-14 18:16:55.178770
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "bf40a4e7aeb1"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column(
        "wallets",
        "wallet_type",
        new_column_name="description",
        existing_type=sa.String(length=12),
        type_=sa.String(length=100),
        existing_nullable=False,
        nullable=True,
    )


def downgrade() -> None:
    op.alter_column(
        "wallets",
        "description",
        new_column_name="wallet_type",
        existing_type=sa.String(length=100),
        type_=sa.String(length=12),
        existing_nullable=True,
        nullable=False,
    )