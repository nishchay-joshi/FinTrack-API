import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/analytics.css";
import AnalyticsCards from "../components/analytics/AnalyticsCards";

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
                <div className="placeholder-chart">
                    Income vs Expense Chart
                </div>
                <div className="placeholder-chart">
                    Category Breakdown
                </div>
            </section>
            {isInsightsOpen && (
                <div className="placeholder-modal">
                    <h2>Insights</h2>
                    <button
                        onClick={() =>setIsInsightsOpen(false)}
                    >Close
                    </button>
                </div>
            )}
        </main>
    );
}

export default Analytics;