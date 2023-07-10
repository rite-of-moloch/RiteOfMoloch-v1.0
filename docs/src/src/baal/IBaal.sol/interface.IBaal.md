# IBaal
[Git Source](https://github.com/bitbeckers/RiteOfMoloch-v1.0/blob/3b83c2a4b53015049ac521ff1124c3303695c3c7/src/baal/IBaal.sol)


## Functions
### proposalOffering


```solidity
function proposalOffering() external returns (uint256);
```

### proposalCount


```solidity
function proposalCount() external returns (uint256);
```

### avatar


```solidity
function avatar() external returns (address);
```

### submitProposal


```solidity
function submitProposal(
    bytes calldata proposalData,
    uint32 expiration,
    uint256 baalGas,
    string calldata details
)
    external
    payable
    returns (uint256);
```

### sharesToken


```solidity
function sharesToken() external returns (address);
```

### isManager


```solidity
function isManager(address shaman) external view returns (bool);
```

### mintShares


```solidity
function mintShares(address[] calldata to, uint256[] calldata amount) external;
```

