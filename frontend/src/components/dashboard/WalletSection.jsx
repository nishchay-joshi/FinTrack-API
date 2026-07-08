import {Wallet, Plus}  from "lucide-react";
import { useNavigate } from "react-router-dom";

function WalletSection({ wallets, onDelete }) {

    const navigate = useNavigate();
    const displayedWallets = wallets.slice(0, 4);

    return (
        <section className="wallet-section">
            <div className="section-header">
                <h2>Wallets</h2>
                <button className="primary-button">
                    <Plus size={18} />
                    Add Wallet
                </button>
            </div>
            <div className="wallet-grid">
                {displayedWallets.map((wallet) => (
                    <div
                        key={wallet.id}
                        className="wallet-card"
                    >
                        <div className="wallet-icon">
                            <Wallet size={24} />
                        </div>
                        <h3 className="wallet-name">
                            {wallet.name}
                        </h3>
                        <h2 className="wallet-balance">
                            ₹{Number(wallet.balance).toLocaleString("en-IN")}
                        </h2>
                        <p className="wallet-description">
                            {wallet.wallet_type}
                        </p>
                        <div className="wallet-actions">
                            <button
                                className="view-wallet-button"
                                onClick={() =>
                                    navigate(`/wallet/${wallet.id}`)}
                            >
                                View
                            </button>
                            <button
                                className="delete-wallet-button"
                                onClick={() => onDelete(wallet.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {wallets.length > 4 && (
                <div className="wallet-footer">
                    <button className="secondary-button">
                        View All Wallets
                    </button>
                </div>
            )}
        </section>
    );
}

export default WalletSection;