import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function RecentTransactions({ transactions, wallets }) {

    const walletLookup = Object.fromEntries(
        wallets.map((wallet) => [wallet.id, wallet.name])
    );

    return (
        <section className="paper-panel recent-transactions">
            <div className="panel-header">
                <h2>
                    Recent Transactions
                </h2>
                <Link
                    to="/transactions"
                    className="panel-link"
                >
                    View All
                </Link>
            </div>
            <div className="transaction-list">
                {transactions.length === 0 ? (
                    <p className="empty-state">
                        No transactions yet.
                    </p>
                ) : (
                    transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="transaction-row"
                        >
                            <span className="transaction-date">
                                {new Date(transaction.timestamp)
                                    .toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "numeric",
                                            month: "short",
                                        }
                                    )}
                            </span>
                            <span className="transaction-title">
                                {transaction.note || "Untitled"}
                            </span>
                            <span className="transaction-wallet">
                                {walletLookup[transaction.wallet_id] ?? "Unknown"}
                            </span>
                            <span
                                className={`transaction-amount ${transaction.transaction_type}`}
                            >
                                {transaction.transaction_type === "expense"
                                    ? "-"
                                    : transaction.transaction_type === "income"
                                        ? "+"
                                        : "⇄"}
                                ₹{Number(transaction.amount).toLocaleString("en-IN")}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default RecentTransactions;