from pydantic import BaseModel


class LargestExpense(BaseModel):
    amount: float
    note: str | None


class TopCategory(BaseModel):
    name: str
    amount: float
    percentage: float


class AnalyticsSummary(BaseModel):
    savings_rate: float
    average_daily_spend: float
    largest_expense: LargestExpense
    top_category: TopCategory


class IncomeExpenseBucket(BaseModel):
    label: str
    income: float
    expense: float


class CategoryBreakdown(BaseModel):
    name: str
    amount: float
    percentage: float


class MostActiveDay(BaseModel):
    day: str
    transaction_count: int


class MostUsedWallet(BaseModel):
    name: str
    transaction_count: int


class MostFrequentCategory(BaseModel):
    name: str
    transaction_count: int


class LargestIncome(BaseModel):
    largest_income: float
    largest_income_note: str | None


class AnalyticsInsights(BaseModel):
    most_used_wallet: MostUsedWallet
    most_active_spending_day: MostActiveDay
    largest_income: LargestIncome
    expense_transaction_count: int
    most_frequent_category: MostFrequentCategory


class AnalyticsResponse(BaseModel):
    summary: AnalyticsSummary
    income_vs_expense: list[IncomeExpenseBucket]
    category_breakdown: list[CategoryBreakdown]
    insights: AnalyticsInsights