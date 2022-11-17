// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const DAW2022 = await hre.ethers.getContractFactory("DAW2022");
  const daw2022 = await DAW2022.deploy();

  const tx = await daw2022.deployed();
  const txrcpt = tx.deployTransaction.wait();

  console.log("NFT deployed to address:", daw2022.address);
  console.log("Deployment Gas Fee:", (await txrcpt).gasUsed.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
