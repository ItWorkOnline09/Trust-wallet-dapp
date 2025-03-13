// Import WalletConnect v2
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

// WalletConnect settings
const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org",
});

// Function to Connect Wallet
async function connectWallet() {
    try {
        if (!connector.connected) {
            await connector.createSession();
        }

        // Display QR Code for WalletConnect
        QRCodeModal.open(connector.uri, () => {
            console.log("QR Code Modal Closed");
        });

        // Listen for connection event
        connector.on("connect", (error, payload) => {
            if (error) throw error;

            QRCodeModal.close();
            alert("Wallet Connected!");
        });

    } catch (error) {
        console.error("Wallet connection failed:", error);
        alert("Failed to connect wallet. Try using Trust Wallet’s built-in browser.");
    }
}

// Function to Add USDT Token
async function addUSDTToken() {
    if (!connector.connected) {
        alert("Please connect your wallet first!");
        return;
    }

    try {
        const tokenDetails = {
            type: "TRC20",
            options: {
                address: "TGkxzkDKyMeq2T7edKnyjZoFypyzjkkssq",
                symbol: "USDT",
                decimals: 6,
            }
        };

        await connector.sendCustomRequest({
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