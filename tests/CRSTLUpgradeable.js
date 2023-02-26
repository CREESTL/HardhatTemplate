const { ethers } = require("hardhat");
const { expect } = require("chai");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { parseEther, parseUnits } = ethers.utils;



describe("CREESTLUpgradeable token", function () {
    async function deploys() {
        [ownerAcc, clientAcc1, clientAcc2, clientAcc3] = await ethers.getSigners();
        let tokenUpgradeableTx = await ethers.getContractFactory("CRSTLUpgradeable");
        let tokenUpgradeable = await upgrades.deployProxy(tokenUpgradeableTx, [
            "CREESTLUpgradeable",
            "CRSTLU",
            18
        ],
        {
            initializer: "initialize",
            kind: "uups",
        });
        await tokenUpgradeable.deployed();
        await tokenUpgradeable.mint(ownerAcc.address, parseEther("1000000"));

        return {tokenUpgradeable};
    }

    describe("Deployment", async function () {
        it("OK: Have correct name, symbol, decimals", async function () {
            let { tokenUpgradeable } = await loadFixture(deploys);

            expect(await tokenUpgradeable.name()).to.equal("CREESTLUpgradeable");
            expect(await tokenUpgradeable.symbol()).to.equal("CRSTLU");
            expect(await tokenUpgradeable.decimals()).to.equal(18);
        });
    });

    describe("Transactions", async function () {
        it("OK: Transfer tokenUpgradeables between accounts", async function () {

            let { tokenUpgradeable } = await loadFixture(deploys);

            let transferAmount = parseEther("100");
            await expect(
                tokenUpgradeable
                    .connect(ownerAcc)
                    .transfer(clientAcc1.address, transferAmount)
            )
                .to.emit(tokenUpgradeable, "Transfer")
                .withArgs(ownerAcc.address, clientAcc1.address, transferAmount);

            let endBalance = await tokenUpgradeable.balanceOf(clientAcc1.address);
            expect(endBalance).to.equal(transferAmount);
        });

        it("Revert: Sender doesn't have enough tokenUpgradeables", async function () {
            let { tokenUpgradeable } = await loadFixture(deploys);
            let startBalance = await tokenUpgradeable.balanceOf(ownerAcc.address);
            let transferAmount = parseEther("100");
            await expect(
                tokenUpgradeable.connect(clientAcc2).transfer(ownerAcc.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
            let endBalance = await tokenUpgradeable.balanceOf(ownerAcc.address);
            // Owner balance shouldn't have changed.
            expect(endBalance).to.equal(startBalance);
        });

        it("OK: update balances after transfers", async function () {
            let { tokenUpgradeable } = await loadFixture(deploys);
            let startOwnerBalance = await tokenUpgradeable.balanceOf(ownerAcc.address);
            let transferAmount1 = parseEther("100");
            let transferAmount2 = parseEther("200");

            await tokenUpgradeable
                .connect(ownerAcc)
                .transfer(clientAcc1.address, transferAmount1);


            await tokenUpgradeable
                .connect(ownerAcc)
                .transfer(clientAcc2.address, transferAmount2);

            let endOwnerBalance = await tokenUpgradeable.balanceOf(ownerAcc.address);

            expect(endOwnerBalance).to.equal(
                startOwnerBalance
                    .sub(transferAmount1)
                    .sub(transferAmount2)
            );

            let endClientBalance1 = await tokenUpgradeable.balanceOf(clientAcc1.address);
            expect(endClientBalance1).to.equal(transferAmount1);

            let endClientBalance2 = await tokenUpgradeable.balanceOf(clientAcc2.address);
            expect(endClientBalance2).to.equal(transferAmount2);
        });
    });

    describe("Upgrades", () => {
        it("OK: Have a new method after upgrade", async () => {

            let tokenUpgradeableV1Tx = await ethers.getContractFactory("CRSTLUpgradeable");
            let tokenUpgradeableV2Tx = await ethers.getContractFactory("CRSTLUpgradeableV2");

            let tokenUpgradeableV1 = await upgrades.deployProxy(tokenUpgradeableV1Tx, [
                "CREESTLUpgradeable",
                "CRSTLU",
                18
            ], 
            {
                initializer: "initialize",
                kind: "uups",
            });
            let tokenUpgradeableV2 = await upgrades.upgradeProxy(
                tokenUpgradeableV1.address,
                tokenUpgradeableV2Tx,
                {
                    kind: "uups",
                }
            );

            expect(await tokenUpgradeableV2.agent()).to.equal(47);
        });
    });
});
