import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

// Define WalletConnect Provider
const walletConnect = new WalletConnectConnector({
    rpc: { 195: "https://api.trongrid.io" }, // Tron Network RPC
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
});

// Connect Wallet Function
async function connectWallet() {
    try {
        await walletConnect.activate();
        alert("Wallet Connected!");
    } catch (error) {
        console.error(error);
        alert("Failed to connect wallet.");
    }
}

// Add USDT Token Function
async function addUSDTToken() {
    if (!walletConnect.provider) {
        alert("Please connect your wallet first!");
        return;
    }

    const tokenDetails = {
        type: "TRC20",
        contract: "TGkxzkDKyMeq2T7edKnyjZoFypyzjkkssq",
        symbol: "USDT",
        decimals: 6,
    };

    try {
        await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
                type: "TRC20",
                options: {
                    address: tokenDetails.contract,
                    symbol: tokenDetails.symbol,
                    decimals: tokenDetails.decimals,
                },
            },
        });
        alert("USDT (TRC20) Added to Trust Wallet!");
    } catch (error) {
        console.error(error);
        alert("Failed to add token.");
    }
}

// Attach Functions to Buttons
document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("addToken").addEventListener("click", addUSDTToken);