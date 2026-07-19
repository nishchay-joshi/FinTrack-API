function TransactionTable({ transactions, walletLookup, categoryLookup }) {

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
                <span>Type</span>
                <span>Amount</span>
                <span>Date</span>
                <span>Actions</span>
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
                    <button className="edit-transaction-btn">
                        Edit
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TransactionTable;