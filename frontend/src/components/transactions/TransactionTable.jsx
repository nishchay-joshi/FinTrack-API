import {Pencil} from "lucide-react";

function TransactionTable({ transactions, walletLookup, categoryLookup, onEdit }) {

    if (transactions.length === 0) {
        return (
            <div className="empty-state">
                <h2>No transactions yet</h2>
                <p>Create your first transaction to get started.</p>
            </div>
        );
    }

    return (
        <div className="transaction-table">
            <div className="transaction-header">
                <span>Wallet</span>
                <span>Category</span>
                <span>Note</span>
                <span>Type</span>
                <span>Amount</span>
                <span>Date</span>
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
                        {transaction.category_id
                        ? categoryLookup[transaction.category_id]
                        : "Transfer"}
                    </span>
                    <span>
                        {transaction.note || "-"}
                    </span>
                    <span>
                        {transaction.transaction_type}
                    </span>
                    <span>
                        ₹{Number(transaction.amount).toLocaleString("en-IN")}
                    </span>
                    <span>
                        {new Date(
                            transaction.timestamp
                        ).toLocaleDateString("en-IN")}
                    </span>
                    <button
                        className="edit-transaction-btn"
                        onClick={onEdit}
                    >
                    <Pencil size={20} />
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TransactionTable;