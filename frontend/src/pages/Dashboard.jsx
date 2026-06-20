import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import "./dashboard.css"

function Dashboard({setToken}) {

    const [wallets, setWallets] = useState([]);
    const [name, setName] = useState("");
    const [walletType, setWalletType] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [walletId, setWalletId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [note, setNote] = useState("");
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('access_token');
        setToken(null);
    }

    async function getWallets() {
        try {
            const response = await api.get("/api/wallet/");
            console.log("RESPONSE:", response);
            console.log("DATA:", response.data);
            setWallets(response.data);
        } catch (error) {
            console.error("ERROR:", error);
        }
    }

    useEffect(() => {
        getWallets();
        getCategories();
        getTransactions();
    }, []);

    async function handleCreateWallet() {
        try {
            await api.post("/api/wallet/", {
                name: name,
                wallet_type: walletType,
            })

            setName("");
            setWalletType("");
        } catch (error) {
            console.error(error);
        }

        await getWallets()
    }

    async function handleDeleteWallet(walletId) {
    try {
        await api.delete(`/api/wallet/${walletId}`);

        await getWallets();
    } catch (error) {
        console.error(error);
    }
}

    async function getCategories() {
        try {
            const response = await api.get("/api/category/");
            console.log("RESPONSE:", response);
            console.log("DATA:", response.data);
            setCategories(response.data);
        }
        catch(error) {
            console.error("ERROR:", error);
        }
    }

    async function handleCreateCategory() {
        try {
            await api.post("/api/category/", {
                name: categoryName,
            })

            setCategoryName("");
        } catch (error) {
            console.error(error);
        }

        await getCategories();
    }

    async function handleDeleteCategory(categoryId) {
        try {
        await api.delete(`/api/category/${categoryId}`);

        await getCategories();
    } catch (error) {
        console.error(error);
    }
    }

    async function getTransactions() {
        try {
            const response = await api.get("/api/transaction/");
            setTransactions(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleCreateTransaction() {
        try {
            await api.post("/api/transaction/", {
                wallet_id: Number(walletId),
                category_id: Number(categoryId),
                amount: Number(amount),
                transaction_type: transactionType,
                note: note,
            });

            setAmount("");
            setTransactionType("");
            setWalletId("");
            setCategoryId("");
            setNote("");

            await getTransactions();
            await getWallets();
        } catch (error) {
            console.error(error);
        }
    }

    return (
    <div className="dashboard-container">
        <div className="dashboard-header">
            <div>
                <h1>FinTrack</h1>
                <p>Manage your finances</p>
            </div>

            <button
                className="logout-button"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>

        <div className="wallet-form">
            <input
                className="wallet-name"
                type="text"
                placeholder="Wallet Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />

            <input
                className="wallet-type"
                type="text"
                placeholder="Wallet Type"
                value={walletType}
                onChange={(event) => setWalletType(event.target.value)}
            />

            <button
                className="create-wallet-button"
                type="button"
                onClick={handleCreateWallet}
            >
                Create Wallet
            </button>
        </div>

        <div className="wallet-grid">
            {wallets.map((wallet) => (
                <div className="wallet-card" key={wallet.id}>
                    <h3>{wallet.name}</h3>
                    <p>
                        <strong>Type:</strong> {wallet.wallet_type}
                    </p>
                    <p>
                        <strong>Balance:</strong> ₹{wallet.balance}
                    </p>
                    <div className="wallet-actions">
                    <button
                        className="view-wallet-button"
                        onClick={() => navigate(`/wallet/${wallet.id}`)}
                    >
                        View Wallet
                    </button>
                    <button
                        className="delete-wallet-button"
                        onClick={() => handleDeleteWallet(wallet.id)}
                    >
                        Delete
                    </button>

                </div>
                </div>
            ))}
        </div>
        <div className="category-section">
    <h2>Categories</h2>

    <div className="category-form">
        <input
            className="category-input"
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
        />

        <button
            className="create-category-button"
            type="button"
            onClick={handleCreateCategory}
                >
                    Create Category
                </button>
            </div>

            <div className="category-grid">
                {categories.map((category) => (
                    <div
                        className="category-card"
                        key={category.id}
                    >
                        <h3>{category.name}</h3>

                        <button
                            className="delete-category-button"
                            onClick={() =>
                                handleDeleteCategory(category.id)
                            }
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
        <div className="transaction-section">
        <h2>Transactions</h2>

        <div className="transaction-form">

            <input
                className="transaction-input"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
            />

            <select
                className="transaction-select"
                value={transactionType}
                onChange={(event) =>
                    setTransactionType(event.target.value)
                }
            >
                <option value="">Select Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            <select
                className="transaction-select"
                value={walletId}
                onChange={(event) =>
                    setWalletId(event.target.value)
                }
            >
                <option value="">Select Wallet</option>

                {wallets.map((wallet) => (
                    <option
                        key={wallet.id}
                        value={wallet.id}
                    >
                        {wallet.name}
                    </option>
                ))}
            </select>

            <select
                className="transaction-select"
                value={categoryId}
                onChange={(event) =>
                    setCategoryId(event.target.value)
                }
            >
                <option value="">Select Category</option>

                {categories.map((category) => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>

            <input
                className="transaction-input"
                type="text"
                placeholder="Note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
            />

            <button
                className="create-transaction-button"
                onClick={handleCreateTransaction}
            >
                Create Transaction
            </button>
        </div>
    </div>
    </div>
);

}
export default Dashboard;