from typing import Annotated
from fastapi import APIRouter, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import get_db
from app.schemas.category_schema import CategoryCreate, CategoryResponse
from app.services.category_service import create_category, get_all_categories, delete_category
from app.core.auth import CurrentUser

router = APIRouter()


@router.post("/",
response_model=CategoryResponse,
status_code=status.HTTP_201_CREATED)
async def create_category_endpoint(category_data: CategoryCreate, user: CurrentUser, db: Annotated[AsyncSession, Depends(get_db)]):
    created_category = await create_category(category_data, user, db)
    return created_category


@router.get("/",
            response_model=list[CategoryResponse],
            status_code=status.HTTP_200_OK)
async def get_categories(user: CurrentUser, db: Annotated[AsyncSession, Depends(get_db)]):
    list_of_categories = await get_all_categories(user, db)
    return list_of_categories


@router.delete("/{category_id}",
               status_code=status.HTTP_204_NO_CONTENT)
async def delete_category_endpoint(category_id: int, user: CurrentUser, db: Annotated[AsyncSession, Depends(get_db)]):
    await delete_category(category_id, user, db)