# IRiteOfMolochUser
[Git Source](https://github.com/bitbeckers/RiteOfMoloch-v1.0/blob/3b83c2a4b53015049ac521ff1124c3303695c3c7/src/interfaces/IROMUser.sol)


## Functions
### joinInitiation


```solidity
function joinInitiation(address user) external;
```

### claimStake

*Allows DAO members to claim their initiation stake*


```solidity
function claimStake() external;
```

### cryForHelp

*Allows initiates to log permanent feedback data on-chain*


```solidity
function cryForHelp(string calldata feedback) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`feedback`|`string`|"Developers do something!" Doesn't change contract state; simply passes call-data through an event|


### checkStake


```solidity
function checkStake(address user) external view returns (uint256);
```

### getDeadline

*returns the user's deadline for onboarding*


```solidity
function getDeadline(address user) external view returns (uint256);
```

### isMember

*returns the user's member status*


```solidity
function isMember(address user) external view returns (bool);
```

