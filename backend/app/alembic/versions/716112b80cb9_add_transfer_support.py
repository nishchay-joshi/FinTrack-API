"""add transfer support

Revision ID: 716112b80cb9
Revises: bf40a4e7aeb1
Create Date: 2026-07-15 22:59:31.717024

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '716112b80cb9'
down_revision: Union[str, Sequence[str], None] = 'bf40a4e7aeb1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "transactions",
        sa.Column("transfer_group_id", sa.String(length=36), nullable=True),
    )

    transaction_type_enum = sa.Enum(
        "income",
        "expense",
        "transfer",
        name="transaction_type_enum",
    )

    transaction_type_enum.create(op.get_bind(), checkfirst=True)

    op.alter_column(
        "transactions",
        "transaction_type",
        existing_type=sa.VARCHAR(length=50),
        type_=transaction_type_enum,
        existing_nullable=False,
        postgresql_using="transaction_type::transaction_type_enum",
    )

def downgrade() -> None:
    op.alter_column(
        "transactions",
        "transaction_type",
        existing_type=sa.Enum(
            "income",
            "expense",
            "transfer",
            name="transaction_type_enum",
        ),
        type_=sa.VARCHAR(length=50),
        existing_nullable=False,
        postgresql_using="transaction_type::varchar",
    )

    op.drop_column("transactions", "transfer_group_id")

    sa.Enum(
        "income",
        "expense",
        "transfer",
        name="transaction_type_enum",
    ).drop(op.get_bind(), checkfirst=True)
