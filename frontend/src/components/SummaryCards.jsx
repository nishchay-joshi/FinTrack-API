function SummaryCards({ wallets, transactions }) {

    const totalBalance = wallets.reduce(
        (sum, wallet) => sum + wallet.amount, 0);

    const totalIncome = transactions
        .filter((transaction) =>
                transaction.transaction_type === "income")
        .reduce((sum, transaction) =>
                sum + transaction.amount, 0);

    const totalExpense = transactions
        .filter((transaction) =>
                transaction.transaction_type === "expense")
        .reduce((sum, transaction) =>
                sum + transaction.amount, 0);

    const savings = totalIncome - totalExpense;

    return (
        <section className="summary-section">
            <div className="summary-card">
                <h3>Total Balance</h3>
                <p>₹{totalBalance.toFixed(2)}</p>
            </div>
            <div className="summary-card">
                <h3>Income</h3>
                <p>₹{totalIncome.toFixed(2)}</p>
            </div>
            <div className="summary-card">
                <h3>Expenses</h3>
                <p>₹{totalExpense.toFixed(2)}</p>
            </div>
            <div className="summary-card">
                <h3>Savings</h3>
                <p>₹{savings.toFixed(2)}</p>
            </div>
        </section>
    );
}

export default SummaryCards;