import { Pencil, Trash2 } from "lucide-react";
import { getWalletIcon, getWalletColor } from "../../utils/walletIcons";

function WalletRow({
    wallet,
    index,
    onEdit,
    onDelete,
}) {

    const Icon = getWalletIcon(index);
    const color = getWalletColor(index);

    return (
        <div className="wallet-row">
            <div className="wallet-left">
                <div className={`wallet-icon ${color}`}>
                    <Icon
                        size={18}
                        color="white"
                    />
                </div>
                <div>
                    <h3>{wallet.name}</h3>
                    <span>{wallet.description}</span>
                </div>
            </div>
            <div className="wallet-right">
                <p className="wallet-balance">
                    ₹{Number(wallet.balance).toLocaleString("en-IN")}
                </p>
                <div className="wallet-actions">
                    <button
                        className="wallet-action edit"
                        onClick={() => onEdit(wallet)}
                        title="Edit Wallet"
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        className="wallet-action delete"
                        onClick={() => onDelete(wallet)}
                        title="Delete Wallet"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WalletRow;