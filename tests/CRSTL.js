const { ethers } = require("hardhat");
const { expect } = require("chai");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { parseEther, parseUnits } = ethers.utils;

describe("CREESTL Token", function () {
    async function deploys() {
        [ownerAcc, clientAcc1, clientAcc2, clientAcc3] =
            await ethers.getSigners();
        let tokenFactory = await ethers.getContractFactory("CRSTL");
        let token = await tokenFactory.deploy("CREESTL", "CRSTL", 18);
        await token.deployed();
        await token.mint(ownerAcc.address, parseEther("1000000"));

        return { token };
    }

    describe("Deployment", async function () {
        it("OK: Have correct name, symbol, decimals", async function () {
            let { token } = await loadFixture(deploys);

            expect(await token.name()).to.equal("CREESTL");
            expect(await token.symbol()).to.equal("CRSTL");
            expect(await token.decimals()).to.equal(18);
        });
    });

    describe("Transactions", async function () {
        it("OK: Transfer tokens between accounts", async function () {
            let { token } = await loadFixture(deploys);

            let transferAmount = parseEther("100");
            await expect(
                token
                    .connect(ownerAcc)
                    .transfer(clientAcc1.address, transferAmount)
            )
                .to.emit(token, "Transfer")
                .withArgs(ownerAcc.address, clientAcc1.address, transferAmount);

            let endBalance = await token.balanceOf(clientAcc1.address);
            expect(endBalance).to.equal(transferAmount);
        });

        it("Revert: Sender doesn't have enough tokens", async function () {
            let { token } = await loadFixture(deploys);
            let startBalance = await token.balanceOf(ownerAcc.address);
            let transferAmount = parseEther("100");
            await expect(
                token.connect(clientAcc2).transfer(ownerAcc.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
            let endBalance = await token.balanceOf(ownerAcc.address);
            // Owner balance shouldn't have changed.
            expect(endBalance).to.equal(startBalance);
        });

        it("OK: update balances after transfers", async function () {
            let { token } = await loadFixture(deploys);
            let startOwnerBalance = await token.balanceOf(ownerAcc.address);
            let transferAmount1 = parseEther("100");
            let transferAmount2 = parseEther("200");

            await token
                .connect(ownerAcc)
                .transfer(clientAcc1.address, transferAmount1);

            await token
                .connect(ownerAcc)
                .transfer(clientAcc2.address, transferAmount2);

            let endOwnerBalance = await token.balanceOf(ownerAcc.address);

            expect(endOwnerBalance).to.equal(
                startOwnerBalance.sub(transferAmount1).sub(transferAmount2)
            );

            let endClientBalance1 = await token.balanceOf(clientAcc1.address);
            expect(endClientBalance1).to.equal(transferAmount1);

            let endClientBalance2 = await token.balanceOf(clientAcc2.address);
            expect(endClientBalance2).to.equal(transferAmount2);
        });
    });
});
