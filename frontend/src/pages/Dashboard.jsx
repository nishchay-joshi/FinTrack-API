import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import "../styles/dashboard.css"
import SummaryCards from "../components/dashboard/SummaryCards.jsx";
import WalletSection from "../components/dashboard/WalletSection.jsx";
import RecentTransactions from "../components/dashboard/RecentTransactions.jsx";

function Dashboard() {

    const [wallets, setWallets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);

    async function getWallets() {
        try {
            const response = await api.get("/api/wallet/");
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
            setCategories(response.data);
        }
        catch(error) {
            console.error("ERROR:", error);
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

    return (
        <div className="dashboard-container">
            <section className="dashboard-hero">
                <h1>Dashboard</h1>
                <p>
                    Welcome back.
                </p>
            </section>
            <SummaryCards
                wallets={wallets}
                transactions={transactions}
            />
            <WalletSection
                wallets={wallets}
                onDelete={handleDeleteWallet}
            />
            <RecentTransactions
                transactions={transactions}
            />
        </div>
    );
}

export default Dashboard;