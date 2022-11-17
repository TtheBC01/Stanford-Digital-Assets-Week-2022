require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("./tasks/general.js");

require("dotenv").config();

// seed phrase for your HD wallet
const mnemonic =
  process.env.MNEMONIC ||
  "test test test test test test test test test test test junk";

// Remote RPC URL
const urlOverride = process.env.ETH_PROVIDER_URL;

// alternative to mnemonic, set a specific private key
const key = process.env.ETH_PRIVATE_KEY;

// if no private key is found in .env, use the public known mnemonic
const accounts = key ? [key] : { mnemonic };

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  gasReporter: {
    enabled: true
  },
  networks: {
    hardhat: {
      chainId: 31337,
      mining: {
        auto: true,
        interval: 5000,
      },
    },
    local: {
      accounts: accounts,
      chainId: 31337,
      url: "http://127.0.0.1:8545",
      gas: 6000000,
      gasPrice: 8000000000,
    },
    fuji: {
      // avalanche testnet
      accounts: accounts,
      chainId: 43113,
      url: urlOverride || "https://api.avax-test.network/ext/bc/C/rpc",
    },
    avalanche: {
      // avalanche mainnet
      accounts: accounts,
      chainId: 43114,
      url: urlOverride || "http://127.0.0.1:8549",
    }
  },
};
