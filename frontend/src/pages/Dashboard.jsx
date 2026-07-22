import { useEffect, useState } from "react";
import api from "../services/api";
import Hero from "../components/dashboard/Hero";
import SummaryCards from "../components/dashboard/SummaryCards";
import WalletPreview from "../components/dashboard/WalletPreview";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import "../styles/dashboard.css";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const response = await api.get("/api/dashboard/");
                setDashboard(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboard();
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
                summary={dashboard.summary}
            />
            <div className="dashboard-grid">
                <WalletPreview
                    wallets={dashboard.wallets}
                />
                <RecentTransactions
                    transactions={dashboard.recent_transactions}
                    wallets={dashboard.wallets}
                />
            </div>
        </main>
    );
}

export default Dashboard;