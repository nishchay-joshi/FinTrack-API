from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine
from app.database.base import Base
from app.models.user_model import User
from app.models.wallet_model import Wallet
from app.models.transaction_model import Transaction
from app.models.category_model import Category
from app.routers import (
    auth_router,
    wallet_router,
    category_router,
    transaction_router,
    dashboard_router,
    analytics_router
)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()

app = FastAPI(lifespan=lifespan)

app.include_router(auth_router.router, prefix="/api/auth", tags=["user"])
app.include_router(wallet_router.router, prefix="/api/wallet", tags=["wallet"])
app.include_router(category_router.router, prefix="/api/category", tags=["category"])
app.include_router(transaction_router.router, prefix="/api/transaction", tags=["transaction"])
app.include_router(dashboard_router.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(analytics_router.router, prefix="/api/analytics", tags=["analytics"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    return {"message": "Welcome to FinTrack API"}
