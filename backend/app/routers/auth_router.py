from typing import Annotated
from fastapi import APIRouter, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.services.user_service import create_user, login_user
from app.schemas.user_schema import UserCreate, UserResponse, Token, UserLogin
from app.core.auth import CurrentUser

router = APIRouter()

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register(user: UserCreate, db: Annotated[AsyncSession, Depends(get_db)]):
    created_user = await create_user(user, db)
    return created_user


@router.post("/login", response_model=Token)
async def login(user_data: UserLogin, db: Annotated[AsyncSession, Depends(get_db)]):
    login_user_token = await login_user(user_data, db)
    return login_user_token


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: CurrentUser):
    return current_user


