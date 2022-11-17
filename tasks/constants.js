const fs = require("fs");

const logTXDetails = (txrct) => {
  console.log("----TX Mined---");
  console.log("Blocknumber:", txrct.blockNumber);
  console.log("TX Hash:", txrct.transactionHash);
  console.log("Gas Used:", txrct.gasUsed.toString());
};

const ERC721 = function () {
  const artifactPath = "./artifacts/contracts/DAW2022.sol/DAW2022.json";
  if (fs.existsSync(artifactPath)) {
    return require("../" + artifactPath);
  } else {
    console.log("ERROR: Artifact not found.")
    return null;
  }
};

// returns deployment address of the Consent Contract Beacon Contract
const dawContract = function () {
    const hre = require("hardhat");
    if (hre.hardhatArguments.network == "local") {
      return "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    } else if (hre.hardhatArguments.network == "fuji") {
      return "";
    } else if (hre.hardhatArguments.network == "avalanche") {
      return "";
    } else {
      return "";
    }
  };

module.exports = {
    logTXDetails,
    ERC721,
    dawContract,
  };