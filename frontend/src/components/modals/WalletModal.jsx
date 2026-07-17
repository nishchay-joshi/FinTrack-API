import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/modal.css";

function WalletModal({
    isOpen,
    onClose,
    onSuccess,
    wallet = null,
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        if (wallet) {
            setName(wallet.name);
            setDescription(wallet.description ?? "");
        } else {
            setName("");
            setDescription("");
        }
    }, [wallet, isOpen]);

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);

        const payload = {
            name,
            description,
        };

        try {
            if (wallet) {
                await api.patch(`/api/wallet/${wallet.id}`,
                    payload,
                );
            } else {
                await api.post("/api/wallet",
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
                    {wallet ? "Edit Wallet" : "Create Wallet"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            Wallet Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="e.g. HDFC Savings"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            Description
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Optional"
                        />
                    </div>
                    <div className="modal-actions">
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : wallet
                                    ? "Save Changes"
                                    : "Create Wallet"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WalletModal;