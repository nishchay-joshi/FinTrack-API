from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.category_model import Category
from app.models.transaction_model import Transaction
from app.models.user_model import User
from app.schemas.category_schema import CategoryCreate, CategoryUpdate


async def create_category(
    category_data: CategoryCreate,
    current_user: User,
    db: AsyncSession,
):
    result = await db.execute(
        select(Category).where(Category.user_id == current_user.id,
            func.lower(Category.name) == func.lower(category_data.name),
        )
    )

    if result.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Category already exists.",
        )

    category = Category(
        user_id=current_user.id,
        name=category_data.name,
        icon=category_data.icon,
        color=category_data.color,
    )

    db.add(category)
    await db.commit()
    await db.refresh(category)
    return category


async def get_all_categories(
    current_user: User,
    db: AsyncSession,
):
    result = await db.execute(
        select(Category).where(Category.user_id == current_user.id)
    )

    return result.scalars().all()


async def delete_category(
    category_id: int,
    current_user: User,
    db: AsyncSession,
):
    result = await db.execute(
        select(Category).where(
            Category.id == category_id,
            Category.user_id == current_user.id,
        )
    )

    category = result.scalars().first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found.",
        )

    result = await db.execute(
        select(Transaction).where(
            Transaction.category_id == category.id,
            Transaction.user_id == current_user.id,
        )
    )

    if result.scalars().first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category cannot be deleted because it is used by existing transactions.",
        )

    await db.delete(category)
    await db.commit()


async def update_category(
    category_id: int,
    category_data: CategoryUpdate,
    current_user: User,
    db: AsyncSession,
):
    result = await db.execute(
        select(Category).where(
            Category.id == category_id,
            Category.user_id == current_user.id,
        )
    )

    category = result.scalars().first()

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found.",
        )

    updated_fields = category_data.model_dump(exclude_unset=True)

    if not updated_fields:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No data sent.",
        )

    if "name" in updated_fields:
        result = await db.execute(
            select(Category).where(
                Category.user_id == current_user.id,
                func.lower(Category.name) == func.lower(updated_fields["name"]),
                Category.id != category.id,
            )
        )

        if result.scalars().first():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Category already exists.",
            )

    for field, value in updated_fields.items():
        setattr(category, field, value)

    await db.commit()
    await db.refresh(category)

    return category