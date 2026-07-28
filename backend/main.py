from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from backend.app.database.database import engine
from backend.app.database.base import Base
from backend.app.routers import auth_router, category_router, analytics_router, dashboard_router, transaction_router, \
    wallet_router, profile_router


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
app.include_router(profile_router.router, prefix="/api/profile", tags=["Profile"])

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
