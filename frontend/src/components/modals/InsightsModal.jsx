import {
    Wallet,
    CalendarDays,
    TrendingUp,
    Receipt,
    Tag,
    X,
} from "lucide-react";
import "../../styles/modal.css";
import "../../styles/analytics.css";

function InsightsModal({
    isOpen,
    onClose,
    insights,
}) {

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
        >
            <div
                className="modal insights-modal"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="insights-header">
                    <h2>Financial Insights</h2>
                    <button
                        className="close-btn"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="insights-grid">
                    <div className="insight-card">
                        <Wallet size={22} />
                        <h3>Most Used Wallet</h3>
                        <h2>{insights.most_used_wallet.name}
                        </h2>
                        <p>
                            {insights.most_used_wallet.transaction_count} Transactions
                        </p>
                    </div>
                    <div className="insight-card">
                        <CalendarDays size={22} />
                        <h3>
                            Most Active Day
                        </h3>
                        <h2>{insights.most_active_spending_day.day}</h2>
                        <p>
                            {insights.most_active_spending_day.transaction_count} Transactions
                        </p>
                    </div>
                    <div className="insight-card">
                        <TrendingUp size={22} />
                        <h3>Largest Income</h3>
                        <h2>
                            ₹{Number(insights.largest_income.largest_income
                            ).toLocaleString("en-IN")}
                        </h2>
                        <p>
                            {insights.largest_income.largest_income_note || "No note"}
                        </p>
                    </div>
                    <div className="insight-card">
                        <Receipt size={22} />
                        <h3>Expense Transactions</h3>
                        <h2>{insights.expense_transaction_count}</h2>
                        <p>During selected period</p>
                    </div>
                    <div className="insight-card full-width">
                        <Tag size={22} />
                        <h3>Most Frequent Category</h3>
                        <h2>{insights.most_frequent_category.name}</h2>
                        <p>
                            {insights.most_frequent_category.transaction_count} Transactions
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InsightsModal;