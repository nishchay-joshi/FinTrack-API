import "../../styles/dashboard.css";

function SummaryCards({ summary }) {

    const cards = [
        {
            title: "Total Balance",
            value: `₹${Number(summary.total_balance).toLocaleString("en-IN")}`,
            subtitle: `Across ${summary.total_wallets} wallets`,
            className: "balance-card",
        },
        {
            title: "Income",
            value: `₹${Number(summary.total_income).toLocaleString("en-IN")}`,
            subtitle: "All Time",
            className: "income-card",
        },
        {
            title: "Expenses",
            value: `₹${Number(summary.total_expense).toLocaleString("en-IN")}`,
            subtitle: "All Time",
            className: "expense-card",
        },
        {
            title: "Transactions",
            value: summary.total_transactions,
            subtitle: "Total",
            className: "transactions-card",
        },
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