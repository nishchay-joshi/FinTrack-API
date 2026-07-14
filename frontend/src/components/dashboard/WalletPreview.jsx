import { Link } from "react-router-dom";
import "../../styles/dashboard.css";
import { getWalletIcon, getWalletColor } from "../../utils/walletIcons";

function WalletPreview({ wallets }) {

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
                    const Icon = getWalletIcon(index);
                    const color = getWalletColor(index);
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