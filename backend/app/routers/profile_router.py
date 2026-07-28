from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.auth import CurrentUser
from app.database.session import get_db
from app.schemas.responses.profile import ProfileResponse
from app.services.profile_service import get_profile

router = APIRouter()


@router.get("/", response_model=ProfileResponse)
async def profile(current_user: CurrentUser, db: AsyncSession = Depends(get_db)):
    return await get_profile(current_user, db)