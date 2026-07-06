import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api.js";
import "../styles/walletPage.css";

function WalletPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [wallet, setWallet] = useState(null);
    const [transactions, setTransactions] = useState([]);

    async function getWalletData() {
        try {
            const response = await api.get(`/api/wallet/${id}`);
            setWallet(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getAllTransactions() {
        try {
            const response = await api.get("/api/transaction/");
            setTransactions(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getWalletData();
        getAllTransactions();
    }, [id]);

    const walletTransactions = transactions.filter(
        (transaction) => transaction.wallet_id === Number(id)
    );

    return (
        <div className="wallet-page-container">
            <button
                className="back-button"
                onClick={() => navigate("/")}
            >
                ← Back to Dashboard
            </button>
            {wallet && (
                <>
                    <div className="wallet-details-card">
                        <h1>{wallet.name}</h1>
                        <div className="wallet-info">
                            <p>
                                <strong>Type:</strong>
                                <span>{wallet.wallet_type}</span>
                            </p>
                            <p>
                                <strong>Current Balance:</strong>
                                <span>₹{wallet.balance}</span>
                            </p>
                        </div>
                    </div>
                    <div className="transactions-section">
                        <h2>Transactions</h2>
                        {walletTransactions.length === 0 ? (
                            <div className="transactions-placeholder">
                                No transactions yet.
                            </div>
                        ) : (
                            <table className="transaction-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Note</th>
                                        <th>Amount</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {walletTransactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td>
                                                {new Date(
                                                    transaction.timestamp
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                {transaction.transaction_type}
                                            </td>
                                            <td>
                                                {transaction.note || "-"}
                                            </td>
                                            <td
                                                className={
                                                    transaction.transaction_type === "income"
                                                        ? "income"
                                                        : "expense"
                                                }
                                            >
                                                {transaction.transaction_type === "income"
                                                    ? "+"
                                                    : "-"}
                                                ₹{transaction.amount}
                                            </td>
                                            <td>
                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        console.log(transaction.id)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default WalletPage;