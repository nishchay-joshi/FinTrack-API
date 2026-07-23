from enum import Enum


class TransactionType(str, Enum):
    INCOME = "income"
    EXPENSE = "expense"
    TRANSFER = "transfer"


class CategoryIcon(str, Enum):
    TAG = "Tag"
    UTENSILS = "UtensilsCrossed"
    CAR = "Car"
    SHOPPING = "ShoppingBag"
    HEART = "HeartPulse"
    HOUSE = "House"
    PLANE = "Plane"
    RECEIPT = "Receipt"
    EDUCATION = "GraduationCap"


class CategoryColor(str, Enum):
    GRAY = "gray"
    ORANGE = "orange"
    BLUE = "blue"
    GREEN = "green"
    PURPLE = "purple"
    RED = "red"
    YELLOW = "yellow"
    PINK = "pink"


class AnalyticsRange(str, Enum):
    LAST_7_DAYS = "7d"
    LAST_30_DAYS = "30d"
    LAST_90_DAYS = "90d"
    LAST_YEAR = "1y"