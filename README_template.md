## Project README Template

_short project description here_

#### Table on contents

[Prereqiusites](#preqs)
[Build](#build)
[Test](#tests)
[Run Scripts](#run)
[Deploy](#deploy)
[Networks](#networks)
[Wallets](#wallets)
[Smart Contracts Upgradeability](#proxy)
[Structure of Deploy Output File](#output)
[Logic](#logic)
[[Known Issues]](#issues)


<a name="preqs">

#### Prerequisites

- Install [Git](https://git-scm.com/)
- Install [Node.js](https://nodejs.org/en/download/)
- Clone this repository with < git clone command here >
- Navigate to the directory with the cloned code
- Install Hardhat with `npm install --save-dev hardhat`
- Install all required dependencies with `npm install`
- Create a file called `.env` in the root of the project with the same contents as `.env.example`
- Place your secret API keys, private keys, etc. to the `.env` file

  :warning:**DO NOT SHARE YOUR .env FILE IN ANY WAY OR YOU RISK TO LOSE ALL YOUR FUNDS**:warning:

<a name="build"/>

### Build

```
npx hardhat compile
```

<a name="tests"/>

### Test

```
npx hardhat test --network hardhat
```

<a name="run"/>

### Run Scripts

```
npx hardhat run <script file name here> --network <network name here>
```

<a name="deploy"/>

### Deploy

```
npx hardhat run scripts/deploy.js --network <network name here>
```
Deployment script takes about 5 minutes to complete. Please, be patient!
After the contracts get deployed you can find their *addresses* and code verification *URLs* in the `scripts/deployOutput.json` file (see [Structure of Deploy Output File](#output)).
Note that this file only refreshes the addresses of contracts that have been successfully deployed (or redeployed). If you deploy only a single contract then its address would get updated and all other addresses would remain untouched and would link to *old* contracts.
Please, **do not** write anything to `deployOutput.json` file yourself! It is a read-only file.
All deployed contracts *are verified* on [Polygonscan](https://mumbai.polygonscan.com/).

<a name="networks"/>

### Networks

а) **Test** network
Make sure you have *enough test tokens* for testnet.

```
npx hardhat run <script name here> --network <test network name here>
```

b) **Main** network
Make sure you have *enough real tokens* in your wallet. Deployment to the mainnet costs money!

```
npx hardhat run <script name here> --network <main network name here>
```

c) **local** network
  - Run Hardhat node locally. All *deploy scripts* will be executed as well:
  ```
  npx hardhat node
  ```
  - Run sripts on the node
  ```
  npx hardhat run <script name here> --network localhost
  ```

<a name="wallets"/>

### Wallets

For deployment you will need to use either *your existing wallet* or *a generated one*.

#### Using an existing wallet

If you choose to use your existing wallet, then you will need to be able to export (copy/paste) its private key. For example, you can export private key from your MetaMask wallet.
Wallet's address and private key should be pasted into the `.env` file (see [Prerequisites](#preqs)).

#### Creating a new wallet

If you choose to create a fresh wallet for this project, you should use `createWallet` script from `scripts/` directory.

```
node scripts/createWallet.js
```

This will generate a single new wallet and show its address and private key. **Save** them somewhere else!
A new wallet *does not* hold any tokens. You have to provide it with tokens of your choice.
Wallet's address and private key should be pasted into the `.env` file (see [Prerequisites](#preqs)).

<a name="proxy"/>

#### Smart Contracts Upgradeability

The source code of upgradeable contracts can be updated *without* the need to redeploy the contracts afterwards. The state of contracts (values in storage) remains the same. This allows to add new features to the contracts and fix existing bugs/vulnerabilities.

It's *highly recommended* to study the following materials for detailed explanation of contracts upgradeability:
1. [What is Proxy](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies)
2. [Difference Between Transparent and UUPS Proxy](https://docs.openzeppelin.com/contracts/4.x/api/proxy#transparent-vs-uups)
3. [How to Write Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable)
4. [How to Deploy and Upgrade Contracts Using Hardhat](https://docs.openzeppelin.com/upgrades-plugins/1.x/hardhat-upgrades)
5. [Constuctor Allowing to Create Upgradeable Contracts](https://wizard.openzeppelin.com/#custom)

#### Using Scripts with Upgradeable Contracts
**Deploy**
In order to deploy contracts follow instructions in [Deploy](#deploy) section. The `scripts/deploy.js` script supports upgradeable contracts.

**Upgrade**
In order to upgrade contracts follow the steps:
1. Create new versions of your contracts. Add `V2`, `V3`, etc. to the end of each new version of each contract. You might have several versions of the same contract in one directory at the same time or you can store them in separate directories
2. Open `scripts/upgrade.js` file
3. Change the `oldContractNames` list if you need. This list represents contracts that you *wish to upgrade*
    Example:
	```
	let oldContractNames = [
    	"CRSTL"
];
	```
4. Change the `newContractNames` list if you need. This list represents new implementations of upgraded contracts. "New implementation" is any contract that *is upgrade-compatible* with the previous implementation and *has a different bytecode*.
    Example:
	```
	let newContractNames = [
    	"CRSTLV2",
];
	```
	*NOTE*:
	- Each of the contracts from the both lists must be present in the project directory
	- Length of both lists must be the same
	- Each contract from `oldContractNames` must have already been deployed in mainnet/testnet
	- Order of contracts in the lists must be the same

5. Run the upgrade script
```
npx hardhat run scripts/upgrade.js --network <network name here>
```
When running, this script will output logs into the console. If you see any error messages in the logs with the script *still running* - ignore them. They might later be used for debug purposes.
If Hardhat Upgrades plugin finds your contracts *upgrade-incompatible* it will generate an error that will stop script execution. Is this case you have to follow the [How to Write Upgradeable Contracts](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable) guide.
After this script completes, the `implementationAddress` and `implementationVerification` fields of contracts from the `oldContractNames` will be changed inside the `scripts/deployOutput.json` file. This will indicate that contracts upgrade was finished successfully.
Even after the upgrade, you should *use only `proxyAddress` or `proxyVerification` fields of the deploy output file to interact with contracts*.

Following contracts are upgradeable:
< list of upgradeable contracts here >

Following contracts are *not* upgradeable:
< list of not upgradeable contracts here >


<a name="output"/>

### Structure of Deploy Output File

This file contains the result of contracts deployment.

It is separated in 2 parts. Each of them represents deployment to testnet or mainnet.
Each part contains information about all deployed contracts:
- The address of the proxy contract (`proxyAddress`) (see [Smart Contracts Upgradeability](#proxy))
- The address of the implementation contract that is under control of the proxy contract (`implementationAddress`)
- The URL for Polygonscan page with verified code of the proxy contract (`proxyVerification`)
- The URL for Polygonscan page with verified code of the implementation contract (`implementationVerification`)

**Use only `proxyAddress` or `proxyVerification` fields to interact with contracts**.

<a name="logic"/>

### Logic

#### Terms

< list of terms here > 

#### Logic Flow

< logic explanation here >

---

<a name="issues"/>

**[Known Issues]**

< issues here ></issues>

