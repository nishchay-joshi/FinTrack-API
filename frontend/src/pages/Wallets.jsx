import { useEffect,useState } from "react";
import axios from "../services/api";
import WalletList from "../components/wallets/WalletList";
import WalletModal from "../components/modals/WalletModal";
import "../styles/wallets.css";

function Wallets(){

    const [wallets,setWallets]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState(null);

    async function fetchWallets(){
        try{
            const response=await axios.get("/api/wallet/");
            setWallets(response.data);
        }catch{
            setError("Failed to load wallets.");
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchWallets();
    },[]);

    async function handleDelete(wallet) {

        const confirmed = window.confirm(
            `Delete "${wallet.name}"?\n\nThis action cannot be undone.`
        );

        if (!confirmed) {
            return;
        }

        try {
            await axios.delete(`/api/wallet/${wallet.id}`);
            await fetchWallets();
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.detail ??
                "Failed to delete wallet."
            );
        }
    }

    return(
        <div className="wallets-page">
            <div className="wallets-header">
                <div>
                    <h1>My Wallets</h1>
                    <p>All your money, in one place.</p>
                </div>
                <button className="add-wallet-button"
                    onClick={() => {
                        setSelectedWallet(null);
                        setIsModalOpen(true);
                    }}
                >
                    + Add Wallet
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <WalletList
                    wallets={wallets}
                    onEdit={(wallet) => {
                        setSelectedWallet(wallet);
                        setIsModalOpen(true);
                    }}
                    onDelete={handleDelete}
                />
            )}
            <WalletModal
                isOpen={isModalOpen}
                wallet={selectedWallet}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedWallet(null);
                }}
                onSuccess={fetchWallets}
            />
        </div>
    );
}

export default Wallets;