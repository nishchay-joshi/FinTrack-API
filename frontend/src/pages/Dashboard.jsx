import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

function Dashboard() {

    const [wallets, setWallets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);

    async function getWallets() {
        try {
            const response = await api.get("/api/wallet/");
            setWallets(response.data);
        } catch (error) {
            console.error("ERROR:", error);
        }
    }

    useEffect(() => {
        getWallets();
        getCategories();
        getTransactions();
    }, []);

    async function handleDeleteWallet(walletId) {
        try {
            await api.delete(`/api/wallet/${walletId}`);

            await getWallets();
        } catch (error) {
            console.error(error);
        }
    }

    async function getCategories() {
        try {
            const response = await api.get("/api/category/");
            setCategories(response.data);
        }
        catch(error) {
            console.error("ERROR:", error);
        }
    }


    async function getTransactions() {
        try {
            const response = await api.get("/api/transaction/");
            setTransactions(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            DASHBOARD
        </div>
    );
}

export default Dashboard;