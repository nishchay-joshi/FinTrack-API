import "../styles/EditTransactionModal.css";

function EditTransactionModal({
    isOpen,
    wallets,
    categories,
    walletId,
    setWalletId,
    categoryId,
    setCategoryId,
    amount,
    setAmount,
    transactionType,
    setTransactionType,
    note,
    setNote,
    onClose,
    onSave,
}) {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="edit-modal">
                <h2>Edit Transaction</h2>
                <div className="modal-form">
                    <select
                        value={walletId}
                        onChange={(e) => setWalletId(Number(e.target.value))}
                    >
                        {wallets.map((wallet) => (
                            <option key={wallet.id} value={wallet.id}>
                                {wallet.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <select
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>
                <div className="modal-buttons">
                    <button
                        className="cancel-button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="save-button"
                        onClick={onSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditTransactionModal;