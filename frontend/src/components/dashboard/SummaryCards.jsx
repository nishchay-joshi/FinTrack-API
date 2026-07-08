import {Wallet, ArrowDownCircle, ArrowUpCircle, Receipt} from "lucide-react";

function SummaryCards({ wallets, transactions }) {

    const totalBalance = wallets.reduce(
        (sum, wallet) => sum + Number(wallet.balance), 0);

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

    const summaryData = [
        {
            title: "Total Balance",
            value: `₹${totalBalance.toLocaleString()}`,
            subtitle: `Across ${wallets.length} wallet${wallets.length !== 1 ? "s" : ""}`,
            icon: <Wallet size={22} />,
            iconClass: "balance-icon"
        },
        {
            title: "Total Income",
            value: `₹${totalIncome.toLocaleString()}`,
            subtitle: "All income recorded",
            icon: <ArrowDownCircle size={22} />,
            iconClass: "income-icon"
        },
        {
            title: "Total Expenses",
            value: `₹${totalExpense.toLocaleString()}`,
            subtitle: "All expenses recorded",
            icon: <ArrowUpCircle size={22} />,
            iconClass: "expense-icon"
        },
        {
            title: "Total Transactions",
            value: transactions.length.toLocaleString(),
            subtitle: "Transactions created",
            icon: <Receipt size={22} />,
            iconClass: "transaction-icon"
        }
    ];

    return (
        <section className="summary-section">
            {summaryData.map((card) => (
                <div
                    key={card.title}
                    className="summary-card"
                >
                   <div className="summary-header">
                    <div className={`summary-icon ${card.iconClass}`}>
                        {card.icon}
                    </div>
                    <div className="summary-content">
                        <p className="summary-title">
                            {card.title}
                        </p>
                        <h2 className="summary-value">
                            {card.value}
                        </h2>
                        <p className="summary-subtitle">
                            {card.subtitle}
                        </p>
                    </div>
                </div>
                </div>
            ))}
        </section>
    );
}

export default SummaryCards;