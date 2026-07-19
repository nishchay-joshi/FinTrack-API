import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/modal.css";

function TransferModal({
    isOpen,
    wallets,
    onClose,
    onSuccess,
}) {

    const [sourceWalletId, setSourceWalletId] = useState("");
    const [destinationWalletId, setDestinationWalletId] = useState("");
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!isOpen) return;

        if (wallets.length >= 2) {
            setSourceWalletId(wallets[0].id);
            setDestinationWalletId(wallets[1].id);
        } else if (wallets.length === 1) {
            setSourceWalletId(wallets[0].id);
            setDestinationWalletId("");
        } else {
            setSourceWalletId("");
            setDestinationWalletId("");
        }
        setAmount("");
        setNote("");
    }, [isOpen, wallets]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (sourceWalletId === destinationWalletId) {
            alert("Source and destination wallets must be different.");
            return;
        }

        setLoading(true);

        const payload = {
            source_wallet_id: Number(sourceWalletId),
            destination_wallet_id: Number(destinationWalletId),
            amount: Number(amount),
            note,
        };

        try {
            await api.post("/api/transaction/transfer",
                payload,
            );

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
                <h2>Transfer Money</h2>
                <form onSubmit={handleSubmit}>
                    <div className="modal-grid">
                        <div className="form-group">
                            <label>
                                From Wallet
                            </label>
                            <select
                                value={sourceWalletId}
                                onChange={(event) =>
                                    setSourceWalletId(event.target.value)
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
                                To Wallet
                            </label>
                            <select
                                value={destinationWalletId}
                                onChange={(event) =>
                                    setDestinationWalletId(event.target.value)
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
                            {loading
                                ? "Transferring..."
                                : "Transfer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TransferModal;