import {
    Wallet,
    PiggyBank,
    Briefcase,
    Shield,
    TrendingUp
} from "lucide-react";

import { Link } from "react-router-dom";
import "../../styles/dashboard.css";

function WalletPreview({ wallets }) {

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
                <h2>
                    My Wallets
                </h2>
                <Link
                    to="/wallets"
                    className="panel-link"
                >
                    View All
                </Link>
            </div>
            <div className="wallet-list">
                {wallets.slice(0, 5).map((wallet, index) => {
                    const Icon = icons[index % icons.length];
                    const color = colors[index % colors.length];
                    return (
                        <div
                            key={wallet.id}
                            className="wallet-row"
                        >
                            <div className="wallet-info">
                                <div className={`wallet-icon ${color}`}>
                                    <Icon size={20} />
                                </div>
                                <span className="wallet-name">
                                    {wallet.name}
                                </span>
                            </div>
                            <span className="wallet-balance">
                                ₹{Number(wallet.balance).toLocaleString("en-IN")}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default WalletPreview;