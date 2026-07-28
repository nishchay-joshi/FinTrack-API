from typing import Annotated
from fastapi import APIRouter, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.wallet_schema import WalletCreate, WalletResponse, WalletUpdate
from app.services.wallet_service import create_wallet, get_all_wallets, get_wallet, delete_wallet, update_wallet
from app.core.auth import CurrentUser

router = APIRouter()


@router.post("/",
response_model=WalletResponse,
status_code=status.HTTP_201_CREATED)
async def create_wallet_endpoint(wallet_data: WalletCreate, user: CurrentUser, db: Annotated[AsyncSession, Depends(get_db)]):
    created_wallet = await create_wallet(wallet_data, user, db)
    return created_wallet


@router.get("/",
            response_model=list[WalletResponse],
            status_code=status.HTTP_200_OK)
async def get_wallets(user: CurrentUser, db: Annotated[AsyncSession, Depends(get_db)]):
    list_of_wallets = await get_all_wallets(user, db)
    return list_of_wallets


@router.get("/{wallet_id}",
            response_model=WalletResponse,
            status_code=status.HTTP_200_OK)
async def get_specific_wallet(wallet_id: int, user: CurrentUser, db: Annotated[AsyncSession, Depends(get_db)]):
    specific_wallet = await get_wallet(wallet_id, user, db)
    return specific_wallet


@router.delete("/{wallet_id}",
               status_code=status.HTTP_204_NO_CONTENT)
async def delete_wallet_endpoint(wallet_id: int, user: CurrentUser, db: Annotated[AsyncSession, Depends(get_db)]):
    await delete_wallet(wallet_id, user, db)


@router.patch(
    "/{wallet_id}",
    response_model=WalletResponse,
    status_code=status.HTTP_200_OK,
)
async def update_wallet_endpoint(
    wallet_id: int,
    wallet_data: WalletUpdate,
    current_user: CurrentUser,
    db: Annotated[AsyncSession, Depends(get_db)],
):
    wallet = await update_wallet(
        wallet_id=wallet_id,
        wallet_data=wallet_data,
        current_user=current_user,
        db=db,
    )

    return wallet
