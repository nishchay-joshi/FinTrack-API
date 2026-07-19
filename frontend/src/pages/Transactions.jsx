import { useEffect, useState } from "react";
import api from "../services/api";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionModal from "../components/modals/TransactionModal";
import TransferModal from "../components/modals/TransferModal";
import "../styles/transactions.css";

function Transactions() {

    const [transactions, setTransactions] = useState([]);
    const [wallets, setWallets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [walletLookup, setWalletLookup] = useState({});
    const [categoryLookup, setCategoryLookup] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    async function fetchTransactions() {
        try {
            const [
                transactionResponse,
                walletResponse,
                categoryResponse,
            ] = await Promise.all([
                api.get("/api/transaction/"),
                api.get("/api/wallet/"),
                api.get("/api/category/"),
            ]);

            setTransactions(transactionResponse.data);
            setWallets(walletResponse.data);
            setCategories(categoryResponse.data);

            const walletMap = {};

            walletResponse.data.forEach((wallet) => {
                walletMap[wallet.id] = wallet.name;
            });

            setWalletLookup(walletMap);
            const categoryMap = {};

            categoryResponse.data.forEach((category) => {
                categoryMap[category.id] = category.name;
            });

            setCategoryLookup(categoryMap);
        } catch (error) {
            console.error(error);
            setError("Failed to load transactions.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="transactions-page">
            <div className="transactions-header">
                <div>
                    <h1>Transactions</h1>
                    <p>
                        Manage all your income, expenses and transfers.
                    </p>
                </div>
                <div className="transactions-buttons">
                    <button
                        className="new-transaction-button"
                        onClick={() => {
                            setSelectedTransaction(null);
                            setIsTransactionModalOpen(true);
                        }}
                    >
                        + New Transaction
                    </button>
                    <button
                        className="transfer-button"
                        onClick={() => setIsTransferModalOpen(true)}
                    >
                        + Transfer
                    </button>
                </div>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <TransactionTable
                    transactions={transactions}
                    walletLookup={walletLookup}
                    categoryLookup={categoryLookup}
                    onEdit={(transaction) => {
                        setSelectedTransaction(transaction);
                        setIsTransactionModalOpen(true);
                    }}
                />
            )}
            <TransactionModal
                isOpen={isTransactionModalOpen}
                transaction={selectedTransaction}
                wallets={wallets}
                categories={categories}
                onClose={() => {
                    setIsTransactionModalOpen(false);
                    setSelectedTransaction(null);
                }}
                onSuccess={fetchTransactions}
            />
            <TransferModal
                isOpen={isTransferModalOpen}
                wallets={wallets}
                onClose={() => {
                    setIsTransferModalOpen(false);
                }}
                onSuccess={fetchTransactions}
            />
        </div>
    );
}

export default Transactions;