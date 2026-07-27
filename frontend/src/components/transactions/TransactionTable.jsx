import { Pencil } from "lucide-react";

function TransactionTable({
    transactions,
    walletLookup,
    categoryLookup,
    onEdit,
}) {

    if (transactions.length === 0) {
        return (
            <div className="empty-state">
                <h2>No transactions yet</h2>
                <p>Create your first transaction to get started.</p>
            </div>
        );
    }

    function getCategory(transaction) {
        if (transaction.transaction_type === "income") {
            return "Income";
        }
        if (transaction.transaction_type === "transfer") {
            return "Transfer";
        }
        return categoryLookup[transaction.category_id] ?? "-";
    }

    return (
        <div className="transaction-table">
            <div className="transaction-header">
                <span>Wallet</span>
                <span>Category</span>
                <span>Note</span>
                <span className="amount-column">Amount</span>
                <span className="date-column">Date</span>
                <span></span>
            </div>
            {transactions.map((transaction) => (
                <div
                    key={transaction.id}
                    className="transaction-row"
                >
                    <span>
                        {walletLookup[transaction.wallet_id]}
                    </span>
                    <span>
                        {getCategory(transaction)}
                    </span>
                    <span>
                        {transaction.note || "-"}
                    </span>
                    <span
                        className={`transaction-amount ${transaction.transaction_type}`}
                    >
                        ₹{Number(transaction.amount).toLocaleString("en-IN")}
                    </span>
                    <span className="transaction-date">
                        {new Date(transaction.timestamp).toLocaleDateString("en-IN")}
                    </span>
                    <button
                        className="edit-transaction-btn"
                        onClick={() => onEdit(transaction)}
                    >
                        <Pencil size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TransactionTable;