require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.29",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/c1528d46bf234ff6a4058c2024b48471", 
      accounts: ["0x761448ee7ef9c5545bad86d4fcbf147cc25ecf1a2c9e0f349b6e39c1d656c2f0"], 
    }
  }
};

