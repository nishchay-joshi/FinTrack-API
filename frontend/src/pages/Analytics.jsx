import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/analytics.css";
import AnalyticsCards from "../components/analytics/AnalyticsCards";
import IncomeExpenseChart from "../components/analytics/IncomeExpenseChart";
import CategoryPieChart from "../components/analytics/CategoryPieChart";
import InsightsModal from "../components/modals/InsightsModal";

function Analytics() {

    const [analytics, setAnalytics] = useState(null);
    const [selectedRange, setSelectedRange] = useState("30d");
    const [loading, setLoading] = useState(true);
    const [isInsightsOpen, setIsInsightsOpen] = useState(false);

    useEffect(() => {
        async function fetchAnalytics() {
            setLoading(true);

            try {
                const response = await api.get("/api/analytics",
                    {
                        params: {analytics_range: selectedRange},
                    }
                );
                setAnalytics(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchAnalytics();
    }, [selectedRange]);

    if (loading) {
        return (
            <div className="analytics-loading">
                Loading...
            </div>
        );
    }

    return (
        <main className="analytics-page">
            <div className="analytics-header">
                <div>
                    <h1>Analytics</h1>
                    <p>Gain insights into your financial habits.</p>
                </div>
                <div className="analytics-actions">
                    <select
                        value={selectedRange}
                        onChange={(event) =>
                            setSelectedRange(event.target.value)
                        }
                    >
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last 90 Days</option>
                        <option value="1y">Last Year</option>
                    </select>
                    <button
                        onClick={() =>setIsInsightsOpen(true)}
                    >View Insights</button>
                </div>
            </div>
            <section className="analytics-summary">
                <AnalyticsCards summary={analytics.summary}/>
            </section>
            <section className="analytics-charts">
                <IncomeExpenseChart
                    data={analytics.income_vs_expense}
                />
                <CategoryPieChart
                    data={analytics.category_breakdown}
                />
            </section>
            {isInsightsOpen && (
                <div className="placeholder-modal">
                    <h2>Insights</h2>
                    <InsightsModal
                        isOpen={isInsightsOpen}
                        onClose={() => setIsInsightsOpen(false)}
                        insights={analytics.insights}
                    />
                </div>
            )}
        </main>
    );
}

export default Analytics;