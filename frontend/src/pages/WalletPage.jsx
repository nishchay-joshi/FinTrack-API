import { useParams, Link } from "react-router-dom";

function WalletPage() {
    const { id } = useParams();

    return (
        <div>
            <Link to="/">← Back</Link>

            <h1>Wallet {id}</h1>

            <p>Transactions will go here</p>
        </div>
    );
}

export default WalletPage;