import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import "../../styles/analytics.css";

function IncomeExpenseChart({ data }) {

    return (
        <section className="analytics-chart-card">
            <div className="analytics-chart-header">
                <h2>Income vs Expenses</h2>
                <p>Compare earnings and spending over time.</p>
            </div>
            <div className="analytics-chart-body">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: -15,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="income"
                            name="Income"
                            fill="#22c55e"
                            radius={[6, 6, 0, 0]}
                        />
                        <Bar
                            dataKey="expense"
                            name="Expense"
                            fill="#ef4444"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}

export default IncomeExpenseChart;