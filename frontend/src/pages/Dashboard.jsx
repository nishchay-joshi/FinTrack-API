import { useEffect, useState } from "react";
import api from "../services/api";
import Hero from "../components/dashboard/Hero";
import SummaryCards from "../components/dashboard/SummaryCards";
import WalletPreview from "../components/dashboard/WalletPreview";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import "../styles/dashboard.css";

function Dashboard() {

    const [wallets, setWallets] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [walletResponse, transactionResponse] = await Promise.all([
                    api.get("/api/wallet"),
                    api.get("/api/transaction")
                ]);
                setWallets(walletResponse.data);
                setTransactions(transactionResponse.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="dashboard-loading">
                Loading...
            </div>
        );
    }

    return (
        <main className="dashboard">
            <Hero />
            <SummaryCards
                wallets={wallets}
                transactions={transactions}
            />
            <div className="dashboard-grid">
                <WalletPreview
                    wallets={wallets}
                />
                <RecentTransactions
                    transactions={transactions}
                    wallets={wallets}
                />
            </div>
        </main>
    );
}

export default Dashboard;