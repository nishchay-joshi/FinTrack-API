import "../../styles/dashboard.css";
import sparkles from "../../assets/doodles/sparkles.svg";

function SummaryCards() {

    const cards = [
        {
            title: "Total Balance",
            value: "₹52,340",
            subtitle: "Across 5 wallets",
            className: "balance-card"
        },
        {
            title: "Income",
            value: "₹1,20,000",
            subtitle: "This Month",
            className: "income-card"
        },
        {
            title: "Expenses",
            value: "₹67,660",
            subtitle: "This Month",
            className: "expense-card"
        },
        {
            title: "Transactions",
            value: "14",
            subtitle: "This Month",
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
                        {card.title === "Transactions" && (
                            <img
                                src={sparkles}
                                alt=""
                                className="summary-sparkles"
                            />
                        )}
                        <h3>
                            {card.title}
                        </h3>
                        <h2>
                            {card.value}
                        </h2>
                        <p>
                            {card.subtitle}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default SummaryCards;