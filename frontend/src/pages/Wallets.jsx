import { useEffect,useState } from "react";
import axios from "../services/api";
import WalletList from "../components/wallets/WalletList";
import "../styles/wallets.css";

function Wallets(){

    const [wallets,setWallets]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState("");

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

    return(
        <div className="wallets-page">
            <div className="wallets-header">
                <div>
                    <h1>My Wallets</h1>
                    <p>All your money, in one place.</p>
                </div>
                <button className="add-wallet-button">
                    + Add Wallet
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <WalletList wallets={wallets}/>
            )}
        </div>
    );
}

export default Wallets;