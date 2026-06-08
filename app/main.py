from fastapi import FastAPI
from contextlib import asynccontextmanager

from app.database.database import engine
from app.database.base import Base
from app.models.user_model import User
from app.models.wallet_model import Wallet
from app.models.transaction_model import Transaction
from app.models.category_model import Category
from app.routers import auth_router


@asynccontextmanager
async def lifespan(_app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()

app = FastAPI(lifespan=lifespan)

app.include_router(auth_router.router, prefix="/api/auth", tags=["user"])


@app.get("/")
async def home():
    return {"message": "Welcome to FinTrack API"}
