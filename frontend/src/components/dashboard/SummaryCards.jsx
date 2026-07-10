import "../../styles/dashboard.css";

function SummaryCards({ wallets, transactions }) {

    const totalBalance = wallets.reduce(
        (sum, wallet) =>
            sum + Number(wallet.balance), 0);

    const totalIncome = transactions
        .filter((transaction) =>
            transaction.transaction_type === "income")
        .reduce((sum, transaction) =>
                sum + Number(transaction.amount), 0);

    const totalExpense = transactions
        .filter((transaction) =>
            transaction.transaction_type === "expense")
        .reduce((sum, transaction) =>
                sum + Number(transaction.amount), 0);

    const cards = [
        {
            title: "Total Balance",
            value: `₹${totalBalance.toLocaleString("en-IN")}`,
            subtitle: `Across ${wallets.length} wallets`,
            className: "balance-card"
        },
        {
            title: "Income",
            value: `₹${totalIncome.toLocaleString("en-IN")}`,
            subtitle: "All Time",
            className: "income-card"
        },
        {
            title: "Expenses",
            value: `₹${totalExpense.toLocaleString("en-IN")}`,
            subtitle: "All Time",
            className: "expense-card"
        },
        {
            title: "Transactions",
            value: transactions.length,
            subtitle: "Total",
            className: "transactions-card"
        }
    ];

    return (
        <section className="summary-section">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className={`summary-card ${card.className}`}
                >
                    <div className="summary-tape"></div>
                    <div className="summary-content">
                        <h3>{card.title}</h3>
                        <h2>{card.value}</h2>
                        <p>{card.subtitle}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default SummaryCards;