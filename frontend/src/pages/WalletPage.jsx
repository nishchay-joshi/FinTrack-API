import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api.js";
import "../styles/walletPage.css";
import EditTransactionModal from "../modals/EditTransactionModal.jsx";

function WalletPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [wallet, setWallet] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [wallets, setWallets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [walletId, setWalletId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [note, setNote] = useState("");

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

    async function getWallets() {
        try {
            const response = await api.get("/api/wallet/");
            setWallets(response.data);
        } catch (error) {
            console.error("ERROR:", error);
        }
    }

    useEffect(() => {
        getWalletData();
        getAllTransactions();
        getCategories();
        getWallets();
    }, [id]);

    const walletTransactions = transactions.filter(
        (transaction) => transaction.wallet_id === Number(id)
    );

    async function getCategories() {
        try {
            const response = await api.get("/api/category/");
            setCategories(response.data);
        }
        catch(error) {
            console.error("ERROR:", error);
        }
    }

    function handleEditTransaction(transaction) {
        console.log(transaction);
        setSelectedTransaction(transaction);
        setTransactionType(transaction.transaction_type);
        setWalletId(transaction.wallet_id);
        setCategoryId(transaction.category_id);
        setAmount(transaction.amount);
        setNote(transaction.note);
        setIsEditModalOpen(true);
    }

    async function handleSaveTransaction() {
        try {
            await api.patch(`/api/transaction/${selectedTransaction.id}`, {
                wallet_id: walletId,
                category_id: categoryId,
                amount: Number(amount),
                transaction_type: transactionType,
                note: note,
            });

            setIsEditModalOpen(false);
            await getWalletData();
            await getAllTransactions();
            await getWallets();
        } catch (error) {
            console.error(error);
        }
    }

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
                                                        handleEditTransaction(transaction)
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

        <EditTransactionModal
            isOpen={isEditModalOpen}
            wallets={wallets}
            categories={categories}
            walletId={walletId}
            setWalletId={setWalletId}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            amount={amount}
            setAmount={setAmount}
            transactionType={transactionType}
            setTransactionType={setTransactionType}
            note={note}
            setNote={setNote}
            onClose={() => {
                setIsEditModalOpen(false);
                setSelectedTransaction(null);
            }}
            onSave={handleSaveTransaction}
        />
        </div>
    );
}

export default WalletPage;