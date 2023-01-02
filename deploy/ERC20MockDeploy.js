const { deployments, getNamedAccounts } = hre;
const { deploy } = deployments;
const delay = require("delay");

async function main() {
    const { deployer } = await getNamedAccounts();

    console.log(`[NOTICE!] Chain of deployment: ${network.name}`);

    // Deploy
    contractName = "ERC20Mock";
    console.log(`[${contractName}]: Start of Deployment...`);
    const erc20 = await deploy(`${contractName}`, {
        args: ["Easy20", "E20", 18],
        from: deployer,
        log: true,
    });
    if (erc20.newlyDeployed) {
        console.log(
            `ERC20 deployed at ${erc20.address} using ${erc20.receipt.gasUsed} gas`
        );
    }
    console.log(`[${contractName}]: Deployment Finished!`);

    console.log(`[${contractName}]: Start of Verification...`);

    await delay(90000);

    await hre.run("verify:verify", {
        address: erc20.address,
        constructorArguments: ["Easy20", "E20", 18],
    });

    console.log(`[${contractName}]: Verification Finished!`);
}

module.exports = main;
module.exports.tags = ["ERC20Mock"];
