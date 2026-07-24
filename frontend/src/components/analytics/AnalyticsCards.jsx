import "../../styles/analytics.css";
import {
    PiggyBank,
    CalendarDays,
    TrendingDown,
    PieChart,
} from "lucide-react";

function AnalyticsCards({ summary }) {

    const cards = [
        {
            title: "Savings Rate",
            value: `${summary.savings_rate.toFixed(1)}%`,
            subtitle: "Income saved",
            icon: PiggyBank,
            className: "savings-card",
        },
        {
            title: "Daily Spend",
            value: `₹${Number(summary.average_daily_spend).toLocaleString("en-IN")}`,
            subtitle: "Average per day",
            icon: CalendarDays,
            className: "daily-card",
        },
        {
            title: "Largest Expense",
            value: `₹${Number(summary.largest_expense.amount).toLocaleString("en-IN")}`,
            subtitle: summary.largest_expense.note || "No note",
            icon: TrendingDown,
            className: "expense-card",
        },
        {
            title: "Top Category",
            value: summary.top_category.name,
            subtitle: `${summary.top_category.percentage.toFixed(1)}% of spending`,
            icon: PieChart,
            className: "category-card",
        },
    ];

    return (
        <section className="analytics-cards">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <div
                        key={card.title}
                        className={`analytics-card ${card.className}`}
                    >
                        <div className="analytics-card-top">
                            <Icon size={22} />
                            <span>
                                {card.title}
                            </span>
                        </div>
                        <div className="analytics-card-body">
                            <h2>{card.value}</h2>
                            <p>{card.subtitle}</p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}

export default AnalyticsCards;