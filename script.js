// Import WalletConnect
const WalletConnectProvider = window.WalletConnectProvider.default;

// Connect Wallet Function
async function connectWallet() {
    const provider = new WalletConnectProvider({
        rpc: {
            195: "https://api.trongrid.io", // Tron Network RPC
        }
    });

    await provider.enable();
    window.web3 = new Web3(provider);
    alert("Wallet Connected!");
}

// Add Token Function
async function addUSDTToken() {
    if (!window.web3) {
        alert("Please connect your wallet first!");
        return;
    }

    const tokenDetails = {
        type: "TRC20",
        contract: "TGkxzkDKyMeq2T7edKnyjZoFypyzjkkssq",
        symbol: "USDT",
        decimals: 6
    };

    try {
        await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
                type: "TRC20",
                options: {
                    address: tokenDetails.contract,
                    symbol: tokenDetails.symbol,
                    decimals: tokenDetails.decimals
                }
            }
        });
        alert("USDT (TRC20) Added to Trust Wallet!");
    } catch (error) {
        console.error(error);
        alert("Failed to add token.");
    }
}

// Button Event Listeners
document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("addToken").addEventListener("click", addUSDTToken);