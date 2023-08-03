# RiteOfMolochFactory
[Git Source](https://github.com/bitbeckers/RiteOfMoloch-v1.0/blob/b5061029ecd18fcdad4a31307cf3f098d7bae269/src/RiteOfMolochFactory.sol)

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

This function initializes a new instance of the RiteOfMolochFactory contract. It sets the `hatsProtocol`
variable to the provided Hats protocol implementation address, calls the `_changeHatsContract` function with this
address to configure access control functionality, and sets the `sustainabilityTreasury` and `sustainabilityFee`
variables to the provided values. It then configures the initial RiteOfMoloch implementation contract with the
provided address and stores it in the `implementations` mapping. Finally, it assigns the factory operator role to
the deployer with the provided hat ID.

*Initializes a new instance of the RiteOfMolochFactory contract.*


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
|`_implementation`|`address`|The address of the initial RiteOfMoloch implementation contract.|
|`_hatsProtocol`|`address`|The address of the Hats protocol implementation contract (current release: 0x96bD657Fcc04c71B47f896a829E5728415cbcAa1).|
|`_factoryOperatorHat`|`uint256`|The ID of the hat to assign to the factory operator role.|
|`_sustainabilityTreasury`|`address`|The address of the sustainability treasury contract.|
|`_sustainabilityFee`|`uint256`|The sustainability fee percentage to apply to new cohorts.|


### createCohort

This function allows anyone to create a new cohort contract. It first checks that a valid implementation
is selected. If the check passes, the function deploys a cohort clone proxy with the selected implementation and
initializes it with the provided initialization data. It then emits a `NewRiteOfMoloch` event with information
about the new cohort contract. Finally, it returns the address of the new cohort contract.

*Allows anyone to create a new cohort contract.*


```solidity
function createCohort(InitData calldata initData, uint256 implementationSelector) external payable returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`initData`|`InitData`|The initialization data for the new cohort contract.|
|`implementationSelector`|`uint256`|The ID of the implementation contract to use for the new cohort contract.|


### addImplementation

This function allows the factory operator to add a new implementation contract for additional cohort
formats. It first checks that the new implementation address is not the zero address. If the check passes, the
function assigns a new ID to the implementation, adds it to the `implementations` mapping, and emits an
`AddedImplementation` event with the ID and implementation address.

*Allows the factory operator to add a new implementation contract for additional cohort formats.*


```solidity
function addImplementation(address implementation) external onlyRole(FACTORY_OPERATOR);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`implementation`|`address`|The address of the new implementation contract to add.|


### changeHatsProtocol

This function allows the factory operator to change the Hats protocol implementation. It first checks
that the
new Hats protocol address is not the zero address. If the check passes, the function updates the `hatsProtocol`
variable and calls the `_changeHatsContract` function provided by Hats protocol.

*Allows the factory operator to change the Hats protocol implementation.*


```solidity
function changeHatsProtocol(address _hatsProtocol) external onlyRole(FACTORY_OPERATOR);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_hatsProtocol`|`address`|The address of the new Hats protocol implementation to set.|


### updateSustainabilityFee

This function allows the factory operator to update the sustainability fee. It first checks that the new
fee is not greater than 1e6. If the check passes, the function updates the `sustainabilityFee` variable and emits
an `UpdatedSustainabilityFee` event with the old and new fees.

*Allows the factory operator to update the sustainability fee.*


```solidity
function updateSustainabilityFee(uint256 fee) external onlyRole(FACTORY_OPERATOR);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fee`|`uint256`|The new sustainability fee to set.|


### updateSustainabilityTreasury

This function allows the factory operator to update the sustainability treasury. It first checks that the
new treasury address is not the zero address. If the check passes, the function updates the
`sustainabilityTreasury` variable and emits an `UpdatedSustainabilityTreasury` event with the old and new
treasury addresses.

*Allows the factory operator to update the sustainability treasury.*


```solidity
function updateSustainabilityTreasury(address newSustainabilityTreasury) external onlyRole(FACTORY_OPERATOR);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newSustainabilityTreasury`|`address`|The new sustainability treasury address to set.|


