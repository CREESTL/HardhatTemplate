const {
    ethers,
    deployments,
    getNamedAccounts,
    getUnnamedAccounts,
} = require("hardhat");
const { expect } = require("chai");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { parseUnits } = ethers.utils;
const { makeSnapshot, revertToSnapshot } = require("./utils/time");

describe("ERC20Mock", function () {
    before(async function () {
        [ownerAcc, clientAcc1, clientAcc2, clientAcc3] =
            await ethers.getSigners();
        let tokenFactory = await ethers.getContractFactory("ERC20Mock");
        token = await tokenFactory.deploy("Easy20", "E20", 18);
        await token.deployed();
        await token.mint(ownerAcc.address, parseUnits("100000"));
    });

    beforeEach(async function () {
        snapshotId = await makeSnapshot();
    });

    afterEach(async function () {
        await revertToSnapshot(snapshotId);
    });

    describe("Deployment", async function () {
        it("OK: Assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await token.balanceOf(ownerAcc.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", async function () {
        it("OK: Transfer tokens between accounts", async function () {
            const transferAmount = hre.ethers.utils.parseUnits("100", 6);
            await expect(
                token
                    .connect(ownerAcc)
                    .transfer(clientAcc3.address, transferAmount)
            )
                .to.emit(token, "Transfer")
                .withArgs(ownerAcc.address, clientAcc3.address, transferAmount);

            const aliceBalance = await token.balanceOf(clientAcc3.address);
            expect(aliceBalance).to.equal(transferAmount);
        });

        it("Revert: Sender doesn’t have enough tokens", async function () {
            const initialOwnerBalance = await token.balanceOf(ownerAcc.address);
            await expect(
                token.connect(clientAcc2).transfer(ownerAcc.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

            // Owner balance shouldn't have changed.
            expect(await token.balanceOf(ownerAcc.address)).to.equal(
                initialOwnerBalance
            );
        });

        it("OK: update balances after transfers", async function () {
            const initialOwnerBalance = await token.balanceOf(ownerAcc.address);

            const transferToMishaAmount = hre.ethers.utils.parseUnits("100", 6);
            await token
                .connect(ownerAcc)
                .transfer(clientAcc2.address, transferToMishaAmount);

            const transferToTemaAmount = hre.ethers.utils.parseUnits("100", 6);
            await token
                .connect(ownerAcc)
                .transfer(clientAcc1.address, transferToTemaAmount);

            const finalOwnerBalance = await token.balanceOf(ownerAcc.address);
            expect(finalOwnerBalance).to.equal(
                initialOwnerBalance
                    .sub(transferToTemaAmount)
                    .sub(transferToMishaAmount)
            );

            const carolBalance = await token.balanceOf(clientAcc2.address);
            expect(carolBalance).to.equal(transferToMishaAmount);

            const clientAcc1Balance = await token.balanceOf(clientAcc1.address);
            expect(clientAcc1Balance).to.equal(transferToTemaAmount);
        });
    });
});
