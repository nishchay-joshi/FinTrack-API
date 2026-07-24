import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";
import "../../styles/analytics.css";

const COLORS = [
    "#4F46E5",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
];

function CategoryPieChart({ data }) {

    return (
        <section className="analytics-chart-card">
            <div className="analytics-chart-header">
                <h2>Spending by Category</h2>
                <p>Expense distribution</p>
            </div>
            <div className="pie-chart-content">
                <div className="pie-chart-wrapper">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="amount"
                                nameKey="name"
                                innerRadius={55}
                                outerRadius={80}
                                paddingAngle={3}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={entry.name}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="pie-legend">
                    {data.map((category, index) => (
                        <div
                            key={category.name}
                            className="legend-item"
                        >
                            <span
                                className="legend-color"
                                style={{
                                    backgroundColor:
                                        COLORS[index % COLORS.length],
                                }}
                            />
                            <div>
                                <strong>{category.name}</strong>
                                <p>
                                    {category.percentage.toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CategoryPieChart;