from sqlalchemy.ext.asyncio import AsyncSession
from backend.app.queries.wallet_queries import get_wallet_count
from backend.app.queries.category_queries import get_category_count
from backend.app.queries.transaction_queries import get_transaction_count
from backend.app.schemas.responses.profile import ProfileResponse
from backend.app.models.user_model import User


async def get_profile(current_user: User, db: AsyncSession):
    wallet_count = await get_wallet_count(current_user, db)
    category_count = await get_category_count(current_user, db)
    transaction_count = await get_transaction_count(current_user, db)

    return ProfileResponse(
        name=current_user.username,
        email=current_user.email,
        joined_at=current_user.created_at,
        wallet_count=wallet_count,
        category_count=category_count,
        transaction_count=transaction_count,
    )