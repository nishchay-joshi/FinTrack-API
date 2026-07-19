import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/modal.css";

function TransactionModal({
    isOpen,
    onClose,
    onSuccess,
    wallets,
    categories,
    transaction = null,
}) {

    const [walletId, setWalletId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionType, setTransactionType] = useState("expense");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!isOpen) return;
        if (transaction) {
            setWalletId(transaction.wallet_id);
            setCategoryId(transaction.category_id ?? "");
            setAmount(transaction.amount);
            setTransactionType(transaction.transaction_type);
            setNote(transaction.note ?? "");
        } else {
            setWalletId(wallets[0]?.id ?? "");
            setCategoryId(categories[0]?.id ?? "");
            setAmount("");
            setTransactionType("expense");
            setNote("");
        }
    }, [transaction, wallets, categories, isOpen]);

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        const payload = {
            wallet_id: Number(walletId),
            category_id: Number(categoryId),
            amount: Number(amount),
            transaction_type: transactionType,
            note,
        };

        try {
            if (transaction) {
                await api.patch(`/api/transaction/${transaction.id}`,
                    payload,
                );
            } else {
                await api.post("/api/transaction/",
                    payload,
                );
            }
            await onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
        >
            <div
                className="modal"
                onClick={(event) => event.stopPropagation()}
            >
                <h2>
                    {transaction
                        ? "Edit Transaction"
                        : "New Transaction"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="modal-grid">
                        <div className="form-group">
                            <label>
                                Type
                            </label>
                            <select
                                value={transactionType}
                                onChange={(event) =>
                                    setTransactionType(event.target.value)
                                }
                            >
                                <option value="income">
                                    Income
                                </option>
                                <option value="expense">
                                    Expense
                                </option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>
                                Amount
                            </label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={amount}
                                onChange={(event) =>
                                    setAmount(event.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                Wallet
                            </label>
                            <select
                                value={walletId}
                                onChange={(event) =>
                                    setWalletId(event.target.value)
                                }
                            >
                                {wallets.map((wallet) => (
                                    <option
                                        key={wallet.id}
                                        value={wallet.id}
                                    >
                                        {wallet.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>
                                Category
                            </label>
                            <select
                                value={categoryId}
                                onChange={(event) =>
                                    setCategoryId(event.target.value)
                                }
                            >
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>
                            Note
                        </label>
                        <input
                            type="text"
                            value={note}
                            onChange={(event) =>
                                setNote(event.target.value)
                            }
                            placeholder="Optional"
                        />
                    </div>
                    <div className="modal-actions">
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >
                            {loading ? "Saving..."
                                : transaction ? "Save Changes" : "Add Transaction"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TransactionModal;