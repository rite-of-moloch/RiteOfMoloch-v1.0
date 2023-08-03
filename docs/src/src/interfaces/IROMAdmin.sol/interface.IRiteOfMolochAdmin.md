# IRiteOfMolochAdmin
[Git Source](https://github.com/bitbeckers/RiteOfMoloch-v1.0/blob/b5061029ecd18fcdad4a31307cf3f098d7bae269/src/interfaces/IROMAdmin.sol)

**Inherits:**
[IInitData](/src/interfaces/IInitData.sol/interface.IInitData.md)


## Functions
### initialize


```solidity
function initialize(
    InitData calldata initData,
    address hatsProtocol,
    address caller_,
    address _sustainabilityTreasury,
    uint256 _sustainabilityFee
)
    external
    payable;
```

### setJoinTimeDuration

*Sets the duration of the join time window for new cohorts.*


```solidity
function setJoinTimeDuration(uint256 _newJoinTimeDuration) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newJoinTimeDuration`|`uint256`|The new duration of the join time window, in seconds.|


### extendJoinTimeLimit

*Extends the join time window for new cohorts by a specified amount.*


```solidity
function extendJoinTimeLimit(uint256 _extension) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_extension`|`uint256`|The amount of time, in seconds, by which to extend the join time window.|


### setMaxCohortSize

*Sets the maximum size of a cohort.*


```solidity
function setMaxCohortSize(uint256 _newMaxCohortSize) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newMaxCohortSize`|`uint256`|The new maximum size of a cohort.|


### setMinimumStake

*Allows DAO members to change the staking requirement*


```solidity
function setMinimumStake(uint256 newMinimumStake) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newMinimumStake`|`uint256`|the minimum quantity of tokens a user must stake to join the cohort|


### setShareThreshold

*Allows changing the DAO member share threshold*


```solidity
function setShareThreshold(uint256 newShareThreshold) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newShareThreshold`|`uint256`|the number of shares required to be considered a DAO member|


### setStakeDuration

*Allows changing the maximum initiation duration*


```solidity
function setStakeDuration(uint256 newStakeDuration) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newStakeDuration`|`uint256`|the length in seconds until an initiate's stake is forfeit|


### batchMintBaalShares

*If ROM is a Shaman: Allows minting shares of Baal DAO to become member*


```solidity
function batchMintBaalShares(address[] calldata to) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address[]`|the list of initiate addresses who have passed their rites to become member|


### singleMintBaalShares


```solidity
function singleMintBaalShares(address _to) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|initiate address who has passed their rite to become member|


### sacrifice

*Bleeds the life force of failed initiates into the treasury*


```solidity
function sacrifice() external;
```

### slaughter

*Bleeds the life force of a single failed initiate into the treasury*


```solidity
function slaughter(address _sacrificialLamb) external;
```

