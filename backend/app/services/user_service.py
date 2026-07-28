from datetime import timedelta

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.auth import create_access_token
from app.core.config import settings
from app.schemas.user_schema import UserCreate, Token, UserLogin
from app.models import user_model
from app.core.security import hash_password, verify_password


async def create_user(user_data: UserCreate, db: AsyncSession):
    result = await db.execute(
        select(user_model.User).where(user_model.User.email == user_data.email)
    )

    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists",
        )

    result = await db.execute(
        select(user_model.User).where(user_model.User.username == user_data.username)
    )

    existing_user = result.scalars().first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )

    new_user = user_model.User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user


async def login_user(
    user_data: UserLogin,
    db: AsyncSession,
) -> Token:
    result = await db.execute(
        select(user_model.User).where(
            user_model.User.email == user_data.email,
        ),
    )

    user = result.scalars().first()

    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)

    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=access_token_expires,
    )

    return Token(access_token=access_token, token_type="bearer")

