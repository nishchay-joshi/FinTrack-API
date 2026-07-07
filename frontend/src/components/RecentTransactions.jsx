function RecentTransactions({ transactions }) {

    const recentTransactions = [...transactions]
        .reverse().slice(0, 5);

    return (
        <section className="recent-transactions">
            <div className="section-header">
                <h2>
                    Recent Transactions
                </h2>
            </div>
            <table className="recent-table">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {recentTransactions.map(
                        (transaction) => (
                            <tr
                                key={transaction.id}
                            >
                                <td>
                                    ₹{transaction.amount}
                                </td>
                                <td>
                                    {transaction.transaction_type}
                                </td>
                                <td>
                                    {transaction.note || "-"}
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default RecentTransactions;