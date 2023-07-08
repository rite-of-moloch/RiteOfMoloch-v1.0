# IRiteOfMolochFactory
[Git Source](https://github.com/bitbeckers/RiteOfMoloch-v1.0/blob/50dc1c530dd4ea29cc1789da020cd05e4c1c1f2f/src/interfaces/IROMFactory.sol)

**Inherits:**
[IInitData](/src/interfaces/IInitData.sol/interface.IInitData.md)


## Functions
### createCohort

FUNCTIONS

*Deploys a new clone proxy instance for cohort staking*


```solidity
function createCohort(InitData calldata initData, uint256 implementationSelector) external payable returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`initData`|`InitData`|the complete data for initializing a new cohort|
|`implementationSelector`|`uint256`|points to a logic contract implementation|


### addImplementation

*marks a deployed contract as a suitable implementation for additional cohort formats*


```solidity
function addImplementation(address implementation) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`implementation`|`address`|the contract address for new cohort format logic|


### changeHatsProtocol


```solidity
function changeHatsProtocol(address _hatsProtocol) external;
```

## Events
### NewRiteOfMoloch
EVENTS


```solidity
event NewRiteOfMoloch(
    address cohortContract,
    address deployer,
    address implementation,
    address membershipCriteria,
    address stakingAsset,
    address treasury,
    uint256 threshold,
    uint256 assetAmount,
    uint256 stakeDuration,
    string sbtUrl
);
```

