const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("DAW2022", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployDAW2022() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const DAW2022 = await ethers.getContractFactory("DAW2022");
    const daw2022 = await DAW2022.deploy();

    return { daw2022, owner, otherAccount };
  }

  describe("Deployment and Mint", function () {
    it("Should set the name and symbol", async function () {
      const { daw2022 } = await loadFixture(deployDAW2022);

      expect(await daw2022.name()).to.equal("Digital Assets Week 2022");
      expect(await daw2022.symbol()).to.equal("DAW2022");
    });

    it("Should set the right owner", async function () {
      const { daw2022, owner } = await loadFixture(deployDAW2022);

      expect(await daw2022.owner()).to.equal(owner.address);
    });

    it("Only Owner can mint", async function () {
      const { daw2022, owner, otherAccount } = await loadFixture(
        deployDAW2022
      );

      await expect(daw2022.connect(otherAccount).safeMint(otherAccount.address, "QmDead")).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
      expect(await daw2022.safeMint(otherAccount.address, "QmDead")).to.emit(
        daw2022, "Transfer"
      ).withArgs(anyValue, anyValue, anyValue, anyValue);
    });
  });

  describe("Transfers", function () {
    it("Should transfer the NFT to the owner", async function () {
      const { daw2022, owner, otherAccount } = await loadFixture(
        deployDAW2022
      );

      await daw2022.safeMint(otherAccount.address, "QmDead").then((tx) => {return tx.wait()});
      await daw2022.connect(otherAccount).transferFrom(otherAccount.address, owner.address, 0).then((tx) => {return tx.wait()});

      expect(await daw2022.balanceOf(owner.address)).to.equal(1);
    });
  });
});
