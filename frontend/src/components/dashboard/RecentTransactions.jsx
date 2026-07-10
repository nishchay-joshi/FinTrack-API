import "../../styles/dashboard.css";
import spiral from "../../assets/doodles/spiral.svg";

function RecentTransactions() {

    const transactions = [
        {
            id: 1,
            date: "15 Jun",
            title: "Grocery Shopping",
            wallet: "Cash",
            amount: "-₹1,200",
            type: "expense"
        },
        {
            id: 2,
            date: "14 Jun",
            title: "Salary",
            wallet: "Bank",
            amount: "+₹60,000",
            type: "income"
        },
        {
            id: 3,
            date: "13 Jun",
            title: "Netflix Subscription",
            wallet: "Bank",
            amount: "-₹649",
            type: "expense"
        },
        {
            id: 4,
            date: "12 Jun",
            title: "Wallet Transfer",
            wallet: "Bank → Cash",
            amount: "⇄ ₹5,000",
            type: "transfer"
        },
        {
            id: 5,
            date: "11 Jun",
            title: "Restaurant",
            wallet: "Cash",
            amount: "-₹650",
            type: "expense"
        }
    ];

    return (
        <section className="paper-panel recent-transactions">
            <div className="panel-header">
                <div className="transaction-title-wrapper">
                    <h2>
                        Recent Transactions
                    </h2>
                    <img
                        src={spiral}
                        alt=""
                        className="transaction-spiral"
                    />
                </div>
            </div>
            <div className="transaction-list">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="transaction-row"
                    >
                        <span className="transaction-date">
                            {transaction.date}
                        </span>
                        <span className="transaction-title">
                            {transaction.title}
                        </span>
                        <span className="transaction-wallet">
                            {transaction.wallet}
                        </span>
                        <span
                            className={`transaction-amount ${transaction.type}`}
                        >
                            {transaction.amount}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default RecentTransactions;