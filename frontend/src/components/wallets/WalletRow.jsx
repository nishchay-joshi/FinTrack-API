import { MoreVertical } from "lucide-react";
import { getWalletIcon, getWalletColor } from "../../utils/walletIcons";

function WalletRow({ wallet, index }) {

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
                    <span>{wallet.wallet_type}</span>
                </div>
            </div>
            <div className="wallet-right">
                <p className="wallet-balance">
                    ₹{Number(wallet.balance).toLocaleString("en-IN")}
                </p>
                <button className="wallet-menu">
                    <MoreVertical size={18}/>
                </button>
            </div>
        </div>
    );
}

export default WalletRow;