import { useNavigate } from "react-router-dom";

function WalletSection({ wallets, onDelete }) {

    const navigate = useNavigate();

    return (
        <section className="wallet-section">
            <div className="section-header">
                <h2>Wallets</h2>
                <button className="primary-button">
                    + Add Wallet
                </button>
            </div>
            <div className="wallet-grid">
                {wallets.map((wallet) => (
                    <div
                        key={wallet.id}
                        className="wallet-card"
                    >
                        <h3>
                            {wallet.name}
                        </h3>
                        <p>
                            {wallet.wallet_type}
                        </p>
                        <h2>
                            ₹{wallet.amount}
                        </h2>
                        <div className="wallet-actions">
                            <button
                                onClick={() =>
                                    navigate(`/wallet/${wallet.id}`)}
                            >
                                View
                            </button>
                            <button
                                onClick={() => onDelete(wallet.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default WalletSection;