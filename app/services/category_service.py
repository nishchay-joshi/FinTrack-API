from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.models.category_model import Category
from app.models.user_model import User
from app.schemas.category_schema import CategoryCreate, CategoryUpdate


async def create_category(category_data: CategoryCreate, current_user: User, db: AsyncSession):
    result = await db.execute(
        select(Category).where(
            Category.user_id == current_user.id,
            func.lower(Category.name) == func.lower(category_data.name),
        )
    )

    existing_category = result.scalars().first()

    if existing_category:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Category already exists")

    new_category = Category(
        user_id=current_user.id,
        name=category_data.name,
    )

    db.add(new_category)
    await db.commit()
    await db.refresh(new_category)

    return new_category


async def get_all_categories(user: User, db: AsyncSession):
    result = await db.execute(
        select(Category).where(Category.user_id == user.id)
    )

    categories_list = result.scalars().all()

    return categories_list


async def delete_category(category_id: int, current_user: User, db: AsyncSession):
    result = await db.execute(
        select(Category).where(Category.id == category_id,
                             Category.user_id == current_user.id)
    )

    category = result.scalars().first()

    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="category not found")

    await db.delete(category)
    await db.commit()


async def update_category(
    category_id: int,
    category_data: CategoryUpdate,
    current_user: User,
    db: AsyncSession,
):
    result = await db.execute(
        select(Category).where(Category.id == category_id,
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
                Category.name == updated_fields["name"],
                Category.id != category.id,
            )
        )

        existing_category = result.scalars().first()

        if existing_category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category with this name already exists.",
            )

    for field, value in updated_fields.items():
        setattr(category, field, value)

    await db.commit()
    await db.refresh(category)

    return category