const { ethers } = require("ethers");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-solhint");
require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-abi-exporter");
require("hardhat-contract-sizer");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("hardhat-tracer");
require("@primitivefi/hardhat-dodoc");
require("dotenv").config();

// TODO add acc PK here

// Add some .env individual variables
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

const REPORT_GAS = process.env.REPORT_GAS || "true";
const GAS_REPORTER_TOKEN = process.env.GAS_REPORTER_TOKEN || "ETH";
const GAS_PRICE_API = process.env.GAS_PRICE_API;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";

const MNEMONIC = process.env.MNEMONIC || "";

// Use AlchemyAPI to make fork if its URL specifyed else use the Infura API;
const FORKING_URL = ALCHEMY_API_URL || `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;
const BLOCK_NUMBER = 15073606;

module.exports = {
    defaultNetwork: "hardhat",
    solidity: {
        compilers: [
            {
                version: "0.8.14",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 999999, // max runs for etherscan
                    },
                },
            },
        ],
    },
    networks: {
        hardhat: {
            blockGasLimit: 12450000 * 100,
            forking: {
                url: FORKING_URL,
                // specifing blockNumber available only for AlchemyAPI
                blockNumber: ALCHEMY_API_URL ? BLOCK_NUMBER : undefined,
            },
            accounts: {
                mnemonic: MNEMONIC,
                accountsBalance: ethers.utils.parseEther('1000000').toString(),
            },
        },
        localhost: {
            gasMultiplier: 1.2,
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true
        },
        kovan: {
            url: `https://kovan.infura.io/v3/${INFURA_API_KEY}`,
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true
        },
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true
        },
        goerli: {
            url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true
        },
        polygon_mainnet: {
            url: `https://rpc-mainnet.maticvigil.com/`,
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true
        },
        polygon_testnet: {
            url: `https://matic-testnet-archive-rpc.bwarelabs.com`,
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true
        },
        bsc_mainnet: {
            url: "https://bsc-dataseed.binance.org/",
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true
        },
        bsc_testnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            accounts: {
                mnemonic: MNEMONIC,
            },
            saveDeployments: true
        },
        coverage: {
            url: "http://127.0.0.1:8555",
        },
    },
    namedAccounts: {
        deployer: {
            default: 0
        }
    },
    mocha: {
        timeout: 20000000,
    },
    gasReporter: {
        enabled: REPORT_GAS === "true" ? true : false,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        // The next 2 values are by default configured for Ethereum
        // Change them if using another chain
        // See https://github.com/cgewecke/hardhat-gas-reporter#token-and-gaspriceapi-options-example
        token: GAS_REPORTER_TOKEN,
        gasPriceApi: GAS_PRICE_API,
    },
    typechain: {
        outDir: "./build/typechain",
        externalArtifacts: ['libs/**/abis/**/*.json'],
    },
    abiExporter: {
        path: "./build/abis",
        runOnCompile: true,
        clear: true,
        spacing: 2,
        pretty: true,
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: true,
        strict: true,
        runOnCompile: true
    },
    dodoc: {
        include: [],
        runOnCompile: true,
        freshOutput: true,
        outputDir: "./docs/contracts",
    },
    paths: {
        sources: "./contracts/",
        tests: "./tests/",
        artifacts: "./build/artifacts",
        cache: "./build/cache",
        deployments: "./build/deployments",
    },
    etherscan: {
        apiKey: {
            mainnet: ETHERSCAN_API_KEY,
            kovan: ETHERSCAN_API_KEY,
            rinkeby: ETHERSCAN_API_KEY,
            goerli: ETHERSCAN_API_KEY,
            bsc: BSCSCAN_API_KEY,
            bscTestnet: BSCSCAN_API_KEY,
            polygon: POLYGONSCAN_API_KEY,
            polygonMumbai: POLYGONSCAN_API_KEY,
        },
    }
};
