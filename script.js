// Connect Wallet Function using WalletConnect
async function connectWallet() {
    try {
        // Set up WalletConnect
        const provider = new WalletConnectProvider.default({
            rpc: { 195: "https://api.trongrid.io" }, // Tron Network RPC
            bridge: "https://bridge.walletconnect.org",
            qrcode: true,
        });

        // Enable WalletConnect
        await provider.enable();
        window.web3 = new Web3(provider);

        alert("Wallet Connected!");
    } catch (error) {
        console.error("Wallet connection failed:", error);
        alert("Failed to connect wallet.");
    }
}

// Add USDT Token to Trust Wallet
async function addUSDTToken() {
    if (!window.web3) {
        alert("Please connect your wallet first!");
        return;
    }

    try {
        // Token details for USDT (TRC20)
        const tokenDetails = {
            type: "TRC20",
            options: {
                address: "TGkxzkDKyMeq2T7edKnyjZoFypyzjkkssq",
                symbol: "USDT",
                decimals: 6,
            }
        };

        // Request to add token
        await window.ethereum.request({
            method: "wallet_watchAsset",
            params: tokenDetails,
        });

        alert("USDT (TRC20) Added to Trust Wallet!");
    } catch (error) {
        console.error("Token import failed:", error);
        alert("Failed to add token.");
    }
}

// Attach Functions to Buttons
document.getElementById("connectWallet").addEventListener("click", connectWallet);
document.getElementById("addToken").addEventListener("click", addUSDTToken);