import {useEffect, useState} from "react";
import api from "../services/api.js";
import "./dashboard.css"

function Dashboard({setToken}) {

    const [wallets, setWallets] = useState([]);
    const [name, setName] = useState("");
    const [walletType, setWalletType] = useState("");

    function handleLogout() {
        localStorage.removeItem('access_token');
        setToken(null);
    }

    async function getWallets() {
        try {
            const response = await api.get("/api/wallet/");
            console.log("RESPONSE:", response);
            console.log("DATA:", response.data);
            setWallets(response.data);
        } catch (error) {
            console.error("ERROR:", error);
        }
    }

    useEffect(() => {
        getWallets();
    }, []);

    async function handleCreateWallet() {
        try {
            await api.post("/api/wallet/", {
                name: name,
                wallet_type: walletType,
            })

            setName("");
            setWalletType("");
        } catch (error) {
            console.error(error);
        }

        await getWallets()
    }

    return (
    <div className="dashboard-container">
        <div className="dashboard-header">
            <div>
                <h1>FinTrack</h1>
                <p>Manage your wallets</p>
            </div>

            <button
                className="logout-button"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>

        <div className="wallet-form">
            <input
                className="wallet-name"
                type="text"
                placeholder="Wallet Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />

            <input
                className="wallet-type"
                type="text"
                placeholder="Wallet Type"
                value={walletType}
                onChange={(event) => setWalletType(event.target.value)}
            />

            <button
                className="create-wallet-button"
                type="button"
                onClick={handleCreateWallet}
            >
                Create Wallet
            </button>
        </div>

        <div className="wallet-grid">
            {wallets.map((wallet) => (
                <div className="wallet-card" key={wallet.id}>
                    <h3>{wallet.name}</h3>

                    <p>
                        <strong>Type:</strong> {wallet.wallet_type}
                    </p>

                    <p>
                        <strong>Balance:</strong> ₹{wallet.balance}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

}
export default Dashboard;