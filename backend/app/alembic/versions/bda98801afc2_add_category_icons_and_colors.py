"""add category icons and colors

Revision ID: bda98801afc2
Revises: 7017a7caaa9b
Create Date: 2026-07-20 22:42:05.729134

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bda98801afc2'
down_revision: Union[str, Sequence[str], None] = '7017a7caaa9b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("categories",
        sa.Column(
            "icon",
            sa.String(length=50),
            nullable=False,
            server_default="Tag",
        ),
    )

    op.add_column("categories",
        sa.Column(
            "color",
            sa.String(length=20),
            nullable=False,
            server_default="gray",
        ),
    )

    op.alter_column("categories","icon", server_default=None)
    op.alter_column("categories","color", server_default=None)


def downgrade() -> None:
    op.drop_column('categories', 'color')
    op.drop_column('categories', 'icon')
