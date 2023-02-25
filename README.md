## Hardhat Template

This repository contains a template of a Hardhat project with additional plugins integrated. Use it as a base for your own project.


### List of plugins:

### Solhint

[repo](https://github.com/protofire/solhint)

- Run linter

```
solhint 'contracts/**/*.sol'
```

### Slither

[repo](https://github.com/crytic/slither)

- Install

```
pip3 install slither-analyzer
```

- Run the security check

```
slither .
```

### Solidity Coverage

[repo](https://github.com/sc-forks/solidity-coverage)

- Run the coverage check

```
npx hardhat coverage
```

- Open the results in the browser
  - See results in `coverage/index.html` file

### Prettier (+ Solidity Plugin)

[original repo](https://github.com/prettier/prettier)
[plugin repo](https://github.com/prettier-solidity/prettier-plugin-solidity)

- Run code formatter

```
npx prettier --write .
```

### Hardhat Dodoc

[repo](https://github.com/primitivefinance/primitive-dodoc)

- Run

```
npx hardhat dodoc
```

- It's configured to run on _each_ contracts compilation
- See results in `docs/` directory

### Hardhat Gas Reporter

[repo](https://github.com/cgewecke/hardhat-gas-reporter)

- Run (automatically runs with tests)

```
npx hardhat test
```

### Hardhat Abi Exporter

[repo](https://github.com/ItsNickBarry/hardhat-abi-exporter)

- Run

```
npx hardhat export-abi
```

It automatically runs on contracts compilation

### Hardhat Contract Sizer

[repo](https://github.com/ItsNickBarry/hardhat-contract-sizer)

- Run

```
npx hardhat size-contracts
```

It automatically runs on contracts compilation

### Hardhat Tracer

[repo](https://github.com/zemse/hardhat-tracer)

- Run

```
npx hardhat test --trace
```

or

```
npx hardhat test --fulltrace
```
