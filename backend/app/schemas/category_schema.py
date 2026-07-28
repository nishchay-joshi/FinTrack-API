from datetime import datetime
from app.models.enums import CategoryIcon, CategoryColor
from pydantic import BaseModel, ConfigDict, Field


class CategoryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=50)
    icon: CategoryIcon
    color: CategoryColor


class CategoryResponse(CategoryCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime


class CategoryUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=50)
    icon: CategoryIcon | None = None
    color: CategoryColor | None = None