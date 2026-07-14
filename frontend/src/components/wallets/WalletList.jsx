import WalletRow from "./WalletRow";

function WalletList({wallets}){

    if(wallets.length===0){
        return(
            <div className="wallet-empty">
                <h2>No wallets yet</h2>
                <p>Create your first wallet.</p>
            </div>
        );
    }

    return(
        <div className="wallet-list">
            {wallets.map((wallet, index) =>(
                <WalletRow
                    key={wallet.id}
                    wallet={wallet}
                    index={index}
                />
            ))}
        </div>
    );
}

export default WalletList;