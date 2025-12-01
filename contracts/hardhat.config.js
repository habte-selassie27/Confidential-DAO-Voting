// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();

// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const RPC_URL = process.env.RPC_URL || `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`;

// if (!PRIVATE_KEY) {
//   throw new Error("Please set PRIVATE_KEY in your .env file");
// }

// module.exports = {
//   defaultNetwork: "sepolia",
//   solidity: "0.8.20",
//   networks: {
//     sepolia: {
//       url: RPC_URL,
//       accounts: [PRIVATE_KEY],
//       chainId: parseInt(process.env.CHAIN_ID || "11155111")
//     }
//   }
// };

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY, RPC_URL, CHAIN_ID } = process.env;

if (!PRIVATE_KEY || !RPC_URL) throw new Error("Set PRIVATE_KEY and RPC_URL in .env");

module.exports = {
  defaultNetwork: "sepolia",
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: parseInt(CHAIN_ID || "11155111")
    }
  }
};

