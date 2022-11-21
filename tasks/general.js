const { task } = require("hardhat/config.js");
const {
    ERC721,
    dawContract,
    logTXDetails
  } = require("./constants.js");

task("accounts", "Prints the list of accounts for configured HD Wallet", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
  
    for (const account of accounts) {
      let accountBalance = await account.getBalance();
      console.log(
        account.address,
        "balance:",
        hre.ethers.utils.formatEther(accountBalance),
      );
    }
  });

  task("contractDetails", "Prints details of the digital assets contract.")
  .setAction(async (taskArgs) => {
    const provider = await hre.ethers.provider;

    const contractHandle = new hre.ethers.Contract(
        dawContract(),
        ERC721().abi,
        provider,
      );

    const name = await contractHandle.name();
    const symbol = await contractHandle.symbol();
    const owner = await contractHandle.owner();
    console.log("Name:", name);
    console.log("Symbol:", symbol);
    console.log("Owner:", owner)
  });

task("contractBalance", "Prints the first account.")
  .addParam("queryaddress", "address to query the balance of")
  .addParam("contractaddress", "target smart contract address")
  .setAction(async (taskArgs) => {
    const queryaddress = taskArgs.queryaddress;
    const contractaddress = taskArgs.contractaddress;
    const provider = await hre.ethers.provider;

    const contractHandle = new hre.ethers.Contract(
        contractaddress,
        ERC721().abi,
        provider,
      );

    const balance = await contractHandle.balanceOf(queryaddress);
    console.log("Balance:", balance.toString());
  });

task("safeMint", "Mint a token from NFT contract.")
  .addParam("recipient", "address to receive the NFT")
  .addParam("tokenuri", "custom uri to add to baseURI of the NFT")
  .setAction(async (taskArgs) => {
    const recipient = taskArgs.recipient;
    const tokenuri = taskArgs.tokenuri;
    const accounts = await hre.ethers.getSigners();
    const account = accounts[0];

    const contractHandle = new hre.ethers.Contract(
        dawContract(),
        ERC721().abi,
        account,
      );

    await contractHandle.safeMint(recipient, tokenuri).then(
        (tx) => {
            return tx.wait();
        }
    ).then(
        (txrcpt) => {
            logTXDetails(txrcpt);
        }
    )
  });

task("tokenUri", "Get the token URI for the specified token.")
  .addParam("tokenid", "target token id")
  .setAction(async (taskArgs) => {
    const tokenid = taskArgs.tokenid;
    const provider = await hre.ethers.provider;

    const contractHandle = new hre.ethers.Contract(
        dawContract(),
        ERC721().abi,
        provider,
      );

    await contractHandle.tokenURI(tokenid).then(
        (tokenURI) => {
            console.log("TokenURI:", tokenURI)
        }
    )
  });