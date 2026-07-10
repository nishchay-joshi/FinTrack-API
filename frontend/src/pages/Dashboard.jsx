import Hero from "../components/dashboard/Hero";
import SummaryCards from "../components/dashboard/SummaryCards";
import WalletPreview from "../components/dashboard/WalletPreview";
import RecentTransactions from "../components/dashboard/RecentTransactions";

import "../styles/dashboard.css";

function Dashboard() {
    return (
        <main className="dashboard">
            <Hero />
            <SummaryCards />
            <div className="dashboard-grid">
                <WalletPreview />
                <RecentTransactions />
            </div>
        </main>
    );
}

export default Dashboard;