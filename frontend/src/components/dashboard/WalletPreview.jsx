import {
    Wallet,
    PiggyBank,
    Briefcase,
    Shield,
    TrendingUp
} from "lucide-react";

import "../../styles/dashboard.css";

function WalletPreview() {

    const wallets = [
        {
            id: 1,
            name: "Main Wallet",
            balance: "₹15,230"
        },
        {
            id: 2,
            name: "Savings",
            balance: "₹50,000"
        },
        {
            id: 3,
            name: "Travel Fund",
            balance: "₹10,500"
        },
        {
            id: 4,
            name: "Emergency",
            balance: "₹25,000"
        },
        {
            id: 5,
            name: "Investments",
            balance: "₹8,900"
        }
    ];

    const icons = [
        Wallet,
        PiggyBank,
        Briefcase,
        Shield,
        TrendingUp
    ];

    const colors = [
        "emerald",
        "green",
        "orange",
        "red",
        "purple"
    ];

    return (
        <section className="paper-panel wallet-preview">
            <div className="panel-header">
                <div className="wallet-title-wrapper">
                    <h2>
                        My Wallets
                    </h2>
                </div>
                <button className="panel-link">
                    View All
                </button>
            </div>
            <div className="wallet-list">
                {wallets.map((wallet, index) => {
                    const Icon = icons[index % icons.length];
                    const color = colors[index % colors.length];
                    return (
                        <div
                            key={wallet.id}
                            className="wallet-row"
                        >
                            <div className="wallet-info">
                                <div className={`wallet-icon ${color}`}>
                                    <Icon
                                        size={20}
                                        strokeWidth={2.2}
                                    />
                                </div>
                                <span className="wallet-name">
                                    {wallet.name}
                                </span>
                            </div>
                            <span className="wallet-balance">
                                {wallet.balance}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default WalletPreview;