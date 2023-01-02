const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

async function advanceBlock() {
    return ethers.provider.send("evm_mine", []);
}

async function advanceBlocks(blockNumber) {
    for (let i = 0; i < blockNumber; i++) {
        await advanceBlock();
    }
}

async function advanceBlockTo(blockNumber) {
    for (let i = await ethers.provider.getBlockNumber(); i < blockNumber; i++) {
        await advanceBlock();
    }
}

async function setNextBlockTime(time) {
    if (time instanceof ethers.BigNumber) {
        time = time.toNumber();
    }
    await ethers.provider.send("evm_setNextBlockTimestamp", [time]);
}

async function setTime(time) {
    await setNextBlockTime(time);
    await advanceBlock();
}

async function getCurrentBlockTime() {
    const block = await ethers.provider.getBlock("latest");
    return BigNumber.from(block.timestamp);
}

async function advanceTimeAndBlock(time) {
    await advanceTime(time);
    await advanceBlock();
}

async function advanceTime(time) {
    if (time instanceof ethers.BigNumber) {
        time = time.toNumber();
    }
    await ethers.provider.send("evm_increaseTime", [time]);
}

async function makeSnapshot() {
    return hre.network.provider.send("evm_snapshot");
}

async function revertToSnapshot(snapshotId) {
    await hre.network.provider.send("evm_revert", [snapshotId]);
}

const duration = {
    seconds: function (val) {
        return BigNumber.from(val);
    },
    minutes: function (val) {
        return BigNumber.from(val).mul(this.seconds("60"));
    },
    hours: function (val) {
        return BigNumber.from(val).mul(this.minutes("60"));
    },
    days: function (val) {
        return BigNumber.from(val).mul(this.hours("24"));
    },
    weeks: function (val) {
        return BigNumber.from(val).mul(this.days("7"));
    },
    years: function (val) {
        return BigNumber.from(val).mul(this.days("365"));
    },
};

module.exports = {
    advanceBlock,
    advanceBlocks,
    advanceBlockTo,
    setNextBlockTime,
    setTime,
    getCurrentBlockTime,
    advanceTimeAndBlock,
    advanceTime,
    makeSnapshot,
    revertToSnapshot,
    duration,
};
