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
[Logic](#logic)

<a name="preqs">

#### Prerequisites

- Install [Git](https://git-scm.com/)
- Install [Node.js](https://nodejs.org/en/download/)
- Clone this repository with _git clone command here_
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
npx hardhat run *script file name here* --network *network name here*
```

<a name="deploy"/>

### Deploy

```
npx hardhat run scripts/deploy.js --network *network name here*
```

<a name="networks"/>

### Networks

а) **test** network
Make sure you have _enough test tokens_ for testnet.

```
npx hardhat run *script name here* --network *test network name here*
```

b) **main** network
Make sure you have _enough real tokens_ in your wallet. Deployment to the mainnet costs money!

```
npx hardhat run *script name here* --network *main network name here*
```

c) **local** network
  - Run Hardhat node locally. All *deploy scripts* will be executed as well:
  ```
  npx hardhat node
  ```
  - Run sripts on the node
  ```
  npx hardhat run *scripts name here* --network localhost
  ```

<a name="wallets"/>

### Wallets

For deployment you will need to use either _your existing wallet_ or _a generated one_.

#### Using an existing wallet

If you choose to use your existing wallet, then you will need to be able to export (copy/paste) its private key. For example, you can export private key from your MetaMask wallet.
Wallet's address and private key should be pasted into the `.env` file (see [Prerequisites](#preqs)).

#### Creating a new wallet

If you choose to create a fresh wallet for this project, you should use `createWallet` script from `scripts/` directory.

```
node scripts/createWallet.js
```

This will generate a single new wallet and show its address and private key. **Save** them somewhere else!
A new wallet _does not_ hold any tokens. You have to provide it with tokens of your choice.
Wallet's address and private key should be pasted into the `.env` file (see [Prerequisites](#preqs)).

<a name="logic"/>

### Logic

#### Terms

_list of terms here_

#### Logic Flow

_logic explanation here_
