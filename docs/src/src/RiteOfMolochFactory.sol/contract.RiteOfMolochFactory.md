# RiteOfMolochFactory
[Git Source](https://github.com/bitbeckers/RiteOfMoloch-v1.0/blob/50dc1c530dd4ea29cc1789da020cd05e4c1c1f2f/src/RiteOfMolochFactory.sol)

**Inherits:**
[IRiteOfMolochFactory](/src/interfaces/IROMFactory.sol/interface.IRiteOfMolochFactory.md), HatsAccessControl


## State Variables
### FACTORY_OPERATOR

```solidity
bytes32 public constant FACTORY_OPERATOR = keccak256("FACTORY_OPERATOR");
```


### implementations

```solidity
mapping(uint256 => address) public implementations;
```


### iid

```solidity
uint256 public iid;
```


### hatsProtocol

```solidity
address public hatsProtocol;
```


### factoryOperatorHat

```solidity
uint256 public factoryOperatorHat;
```


### sustainabilityTreasury

```solidity
address public sustainabilityTreasury;
```


### sustainabilityFee

```solidity
uint256 public sustainabilityFee;
```


## Functions
### constructor


```solidity
constructor(
    address _implementation,
    address _hatsProtocol,
    uint256 _factoryOperatorHat,
    address _sustainabilityTreasury,
    uint256 _sustainabilityFee
);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_implementation`|`address`||
|`_hatsProtocol`|`address`|current release: 0x96bD657Fcc04c71B47f896a829E5728415cbcAa1|
|`_factoryOperatorHat`|`uint256`||
|`_sustainabilityTreasury`|`address`||
|`_sustainabilityFee`|`uint256`||


### createCohort

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
function addImplementation(address implementation) external onlyRole(FACTORY_OPERATOR);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`implementation`|`address`|the contract address for new cohort format logic|


### changeHatsProtocol


```solidity
function changeHatsProtocol(address _hatsProtocol) public onlyRole(FACTORY_OPERATOR);
```

### updateSustainabilityFee


```solidity
function updateSustainabilityFee(uint256 fee) external onlyRole(FACTORY_OPERATOR);
```

### updateSustainabilityTreasury


```solidity
function updateSustainabilityTreasury(address newSustainabilityTreasury) external onlyRole(FACTORY_OPERATOR);
```

