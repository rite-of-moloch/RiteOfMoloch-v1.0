# RiteOfMoloch
[Git Source](https://github.com/bitbeckers/RiteOfMoloch-v1.0/blob/b5061029ecd18fcdad4a31307cf3f098d7bae269/src/RiteOfMoloch.sol)

**Inherits:**
[IInitData](/src/interfaces/IInitData.sol/interface.IInitData.md), ERC721Upgradeable, HatsAccessControl, [IRiteOfMoloch](/src/interfaces/IROM.sol/interface.IRiteOfMoloch.md)


## State Variables
### ADMIN

```solidity
bytes32 public constant ADMIN = keccak256("ADMIN");
```


### PERC_POINTS
*The number of percentage points used for the sustainability fee; set to 1_000_000.
We use the PERC_POINTS together with `sustainabilityFee` to calculate the sustainability fee deducted from
stakes.
For example, to calculate the fee represented by a `value` as a percentage of a `total`, you can use the
following code:
```
uint256 stake = 5 * 1e18; // 5 ether
uint256 sustainabilityFee = 50_000; // 5%
uint256 fee = (stake / PERC_POINTS) * sustainabilityFee; // (5 ether / 1e6) * 50,000 = 0.25 ether
```*


```solidity
uint256 public constant PERC_POINTS = 1e6;
```


### _staked
MAPPINGS AND ARRAYS


```solidity
mapping(address => uint256) internal _staked;
```


### deadlines

```solidity
mapping(address => uint256) public deadlines;
```


### initiates

```solidity
mapping(uint256 => mapping(uint256 => address)) internal initiates;
```


### _tokenIdCounter
STATE VARIABLES


```solidity
CountersUpgradeable.Counter internal _tokenIdCounter;
```


### baal
*The `baal` variable represents the Baal DAO contract.*


```solidity
IBaal public baal;
```


### _sharesToken
*The `_sharesToken` variable represents the Baal shares token contract.*


```solidity
IERC20 private _sharesToken;
```


### _token
*The `_token` variable represents the ERC20 interface for the token that will be staked to join the cohort.*


```solidity
IERC20 private _token;
```


### __baseURI
*The `__baseURI` variable represents the cohort's base URI for accessing token metadata.*


```solidity
string internal __baseURI;
```


### cohortName
*The `cohortName` variable represents the name of the cohort.*


```solidity
string public cohortName;
```


### cohortSeason
*The `cohortSeason` variable represents the cohort season counter, which increases after each Sacrifice.*


```solidity
uint256 public cohortSeason;
```


### cohortSize
*The `cohortSize` variable represents the cohort size limit.*


```solidity
uint256 public cohortSize;
```


### cohortCounter
*The `cohortCounter` variable represents the cohort size count.*


```solidity
uint256 public cohortCounter;
```


### joinDuration
*The `joinDuration` variable represents the cohort join duration.*


```solidity
uint256 public joinDuration;
```


### joinEndTime
*The `joinEndTime` variable represents the cohort join expiration.*


```solidity
uint256 public joinEndTime;
```


### shareThreshold
*The `shareThreshold` variable represents the minimum amount of DAO shares required to be considered a
member.*


```solidity
uint256 public shareThreshold;
```


### minimumStake
*The `minimumStake` variable represents the minimum amount of staked tokens required to join the initiation.*


```solidity
uint256 public minimumStake;
```


### stakeDuration
*The `stakeDuration` variable represents the maximum length of time for initiates to succeed at joining.*


```solidity
uint256 public stakeDuration;
```


### sustainabilityFee
*The `sustainabilityFee` variable represents the percentage cut from stakes to support RoM maintenance and
development.*


```solidity
uint256 public sustainabilityFee;
```


### daoTreasury
*The `daoTreasury` variable represents the address of the DAO treasury which will receive the slashed stakes.*


```solidity
address public daoTreasury;
```


### sustainabilityTreasury
*The `sustainabilityTreasury` variable represents the address of the sustainability treasury.*


```solidity
address public sustainabilityTreasury;
```


### hats
*The `hats` variable represents the Hats protocol contract.*


```solidity
IHats public hats;
```


### topHat
*The `topHat` variable represents the ID of the top hat.*


```solidity
uint256 public topHat;
```


### adminHat
*The `adminHat` variable represents the ID of the admin hat.*


```solidity
uint256 public adminHat;
```


### admin1

```solidity
address public admin1;
```


### admin2

```solidity
address public admin2;
```


### initHatTreeLock

```solidity
bool private initHatTreeLock;
```


## Functions
### constructor


```solidity
constructor();
```

### initialize

*Deploys a new clone proxy instance for cohort staking*


```solidity
function initialize(
    InitData calldata initData,
    address hatsProtocol,
    address caller_,
    address _sustainabilityTreasury,
    uint256 _sustainabilityFee
)
    external
    payable
    initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`initData`|`InitData`|the complete initialization data|
|`hatsProtocol`|`address`||
|`caller_`|`address`|the deployer of the new cohort clone|
|`_sustainabilityTreasury`|`address`||
|`_sustainabilityFee`|`uint256`||


### callerIsUser

MODIFIERS

*Modifier for preventing calls from contracts
Safety feature for preventing malicious contract call backs*


```solidity
modifier callerIsUser();
```

### onlyMember

*Modifier for enforcing function callable from DAO members only
Allows decentralized control by DAO members*


```solidity
modifier onlyMember();
```

### onlyShaman

*Modifier for checkin that RiteOfMoloch has Shaman privileges
Prevents calling functions that will revert*


```solidity
modifier onlyShaman();
```

### joinInitiation

USER FUNCTIONS

*Allows an initiate to join the current cohort.*


```solidity
function joinInitiation(address user) public callerIsUser;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The address of the initiate to join. This function allows an initiate to join the current cohort. It first checks that the cohort is still open for joining and that the cohort has not reached its size limit. It then enforces the initiate or sponsor to transfer the correct tokens to the contract by calling the internal `_stake` function. If the stake is successful, the function increments the cohort count, adds the initiate to the tracker by season and ID, and issues a soul bound token by calling the internal `_soulBind` function.|


### claimStake

*Allows a member to claim their staked tokens after the stake duration has passed.
This function allows a member to claim their staked tokens after the stake duration has passed. It first checks
that the member has a stake. If the claim is successful, the
function passes. Otherwise, it reverts.*


```solidity
function claimStake() external onlyMember;
```

### cryForHelp

*Allows a cohort participant to submit feedback to the DAO.*


```solidity
function cryForHelp(string calldata feedback) public;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`feedback`|`string`|The feedback message to submit. This function allows a cohort participant to submit feedback to the DAO treasury. It first checks that the participant has a balance of 1, which means they have successfully committed to the initiation. If the check passes, the function emits a `Feedback` event with the participant's address, the DAO treasury address, and the feedback message.|


### sacrifice

*Bleeds the life force of failed initiates into the treasury*


```solidity
function sacrifice() external onlyRole(ADMIN);
```

### setJoinTimeDuration

ACCESS CONTROL FUNCTIONS

*Sets the duration of the join time window for new cohorts.*


```solidity
function setJoinTimeDuration(uint256 _newJoinTimeDuration) external onlyRole(ADMIN);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newJoinTimeDuration`|`uint256`|The new duration of the join time window, in seconds.|


### extendJoinTimeLimit

*Extends the join time window for new cohorts by a specified amount.*


```solidity
function extendJoinTimeLimit(uint256 _extension) external onlyRole(ADMIN);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_extension`|`uint256`|The amount of time, in seconds, by which to extend the join time window.|


### setMaxCohortSize

*Sets the maximum size of a cohort.*


```solidity
function setMaxCohortSize(uint256 _newMaxCohortSize) external onlyRole(ADMIN);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newMaxCohortSize`|`uint256`|The new maximum size of a cohort.|


### setMinimumStake

*Allows DAO members to change the staking requirement*


```solidity
function setMinimumStake(uint256 newMinimumStake) external onlyRole(ADMIN);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newMinimumStake`|`uint256`|the minimum quantity of tokens a user must stake to join the cohort|


### setShareThreshold

*Allows changing the DAO member share threshold*


```solidity
function setShareThreshold(uint256 newShareThreshold) external onlyRole(ADMIN);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newShareThreshold`|`uint256`|the number of shares required to be considered a DAO member|


### setStakeDuration

*Allows changing the maximum initiation duration*


```solidity
function setStakeDuration(uint256 newMaxTime) external onlyRole(ADMIN);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newMaxTime`|`uint256`|the length in seconds until an initiate's stake is forfeit|


### slaughter

*Bleeds the life force of a single failed initiate into the treasury*


```solidity
function slaughter(address _sacrificialLamb) external onlyRole(ADMIN);
```

### batchMintBaalShares

BAAL DAO FUNCTIONS

*If ROM is a Shaman: Allows minting shares of Baal DAO to become member*


```solidity
function batchMintBaalShares(address[] calldata to) external onlyRole(ADMIN) onlyShaman;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address[]`|the list of initiate addresses who have passed their rites to become member|


### singleMintBaalShares


```solidity
function singleMintBaalShares(address _to) external onlyRole(ADMIN) onlyShaman;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|initiate address who has passed their rite to become member|


### _bloodLetting

PRIVATE OR INTERNAL
RITE OF MOLOCH FUNCTIONS

*Removes a failed initiate's stake and deadline.*


```solidity
function _bloodLetting(address _failedInitiate) internal virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_failedInitiate`|`address`|The address of the failed initiate.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of the failed initiate's stake that was removed.|


### _claim

*Internal function to process a successful claim by a member.*


```solidity
function _claim() internal virtual returns (bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean indicating whether the claim was successful. This function is called internally when a member successfully claims their stake. It first checks that the member has staked tokens, and then stores the member's balance in a local variable. It then deletes the member's balance and deadline timestamp from the contract's storage. Finally, it emits a `Claim` event with the member's address and balance, and transfers the member's original stake back to their address using the `_token.transfer` function.|


### _darkRitual


```solidity
function _darkRitual() internal virtual;
```

### _stake

*Internal function to stake tokens on behalf of an initiate.*


```solidity
function _stake(address _user) internal virtual returns (bool success);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_user`|`address`|The address of the initiate to stake tokens for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`success`|`bool`|A boolean indicating whether the stake was successful. This function is called internally to stake tokens on behalf of an initiate. It first checks that the initiate hasn't previously staked by verifying that their balance is zero. It then calculates the sustainability fee as a percentage of the minimum stake, subtracts this fee from the minimum stake to get the actual stake amount, and sets the initiate's stake total to this amount. It also sets the initiate's deadline timestamp to the current block timestamp plus the stake duration. If the sustainability fee is greater than zero, the function transfers the stake amount minus the fee to the contract's address, and transfers the fee to the sustainability treasury. If the sustainability fee is zero, the function transfers the entire stake amount to the contract's address.|


### _soulBind

*Mints soul bound tokens to the initiate*


```solidity
function _soulBind(address _user) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_user`|`address`|the recipient of the cohort SBT|


### _submitBaalProposal

BAAL INTERNAL

*Submit voting proposal to Baal DAO*


```solidity
function _submitBaalProposal(bytes memory multiSendMetaTx, uint256 options) internal;
```

### _setBaseUri

CONFIGURATION FUNCTIONS

*Sets base URI during initialization*


```solidity
function _setBaseUri(string calldata baseURI) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`baseURI`|`string`|the base uri for accessing token metadata|


### _setJoinTimeDuration


```solidity
function _setJoinTimeDuration(uint256 _newJoinDuration) internal;
```

### _setJoinTimeLimit


```solidity
function _setJoinTimeLimit(uint256 _newJoinTimeLimit) internal;
```

### _setMaxCohortSize


```solidity
function _setMaxCohortSize(uint256 _newMaxCohortSize) internal;
```

### _setMinimumStake


```solidity
function _setMinimumStake(uint256 newMinimumStake) internal virtual;
```

### _setShareThreshold


```solidity
function _setShareThreshold(uint256 newShareThreshold) internal virtual;
```

### _setStakeDuration


```solidity
function _setStakeDuration(uint256 newStakeDuration) internal virtual;
```

### _checkMember

*Authenticates users through the DAO contract*


```solidity
function _checkMember() internal virtual;
```

### _checkManager


```solidity
function _checkManager() internal virtual;
```

### checkStake

VIEW AND PURE FUNCTIONS


```solidity
function checkStake(address user) external view returns (uint256);
```

### getDeadline

*returns the user's deadline for onboarding*


```solidity
function getDeadline(address user) public view returns (uint256);
```

### isMember

*returns the user's member status*


```solidity
function isMember(address user) public view returns (bool);
```

### stakingAsset

*returns the token to stake in this cohort*


```solidity
function stakingAsset() public view returns (address);
```

### _msgSender

OVERRIDES


```solidity
function _msgSender() internal view override(Context, ContextUpgradeable) returns (address);
```

### _msgData


```solidity
function _msgData() internal pure override(Context, ContextUpgradeable) returns (bytes calldata);
```

### _baseURI


```solidity
function _baseURI() internal view override returns (string memory);
```

### _beforeTokenTransfer


```solidity
function _beforeTokenTransfer(address _from, address, uint256, uint256) internal virtual override;
```

### supportsInterface


```solidity
function supportsInterface(bytes4 interfaceId) public view override(ERC721Upgradeable) returns (bool);
```

### initializeHatTree

HATS ACCESS CONTROL SETUP

*create & mint admin hats to deployer & admin addresses
DAO can grant/revoke adminHats (after topHat is transferred below)*


```solidity
function initializeHatTree(address _deployer, address _admin1, address _admin2) public;
```

### mintAdminHatProposal

*send proposal to Baal to mint another admin
protected by Hats protocol logic and Baal governance*


```solidity
function mintAdminHatProposal(address _to) external payable;
```

### transferAdminHatProposal

*send proposal to Baal to transfer adminHat to new EOA
protected by Hats protocol logic and Baal governance*


```solidity
function transferAdminHatProposal(address _from, address _to) external payable;
```

### _encodeShamanProposal

ENCODING

*Encoding function for Baal Shaman*


```solidity
function _encodeShamanProposal(address shaman, uint256 permission) internal pure returns (bytes memory);
```

### _encodeTransferHat

*Encoding function for accessing an existing topHat*


```solidity
function _encodeTransferHat(uint256 _hat, address _from, address _to) internal returns (bytes memory);
```

### _encodeMintHat

*Encoding function for minting an adminHat*


```solidity
function _encodeMintHat(uint256 _hat, address _to) internal returns (bytes memory);
```

### _encodeBuildHatTree

*Encoding function for building on existing Hats tree*


```solidity
function _encodeBuildHatTree(
    address _deployer,
    address _admin1,
    address _admin2
)
    internal
    pure
    returns (bytes memory);
```

### _encodeMultiMetaTx

*Format multiSend for encoded functions*


```solidity
function _encodeMultiMetaTx(bytes[] memory _data, address[] memory _targets) internal pure returns (bytes memory);
```

