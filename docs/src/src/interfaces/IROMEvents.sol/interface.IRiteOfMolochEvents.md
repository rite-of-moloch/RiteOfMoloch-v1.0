# IRiteOfMolochEvents
[Git Source](https://github.com/bitbeckers/RiteOfMoloch-v1.0/blob/b5061029ecd18fcdad4a31307cf3f098d7bae269/src/interfaces/IROMEvents.sol)


## Events
### Initiation
EVENTS


```solidity
event Initiation(address newInitiate, address benefactor, uint256 tokenId, uint256 stake, uint256 deadline);
```

### Sacrifice

```solidity
event Sacrifice(address sacrifice, uint256 slashedAmount, address slasher);
```

### Claim

```solidity
event Claim(address newMember, uint256 claimAmount);
```

### UpdatedJoinTimeDuration
*Emitted when the join time duration for a cohort is updated.*


```solidity
event UpdatedJoinTimeDuration(uint256 oldJoinTimeDuration, uint256 newJoinTimeDuration);
```

### UpdatedJoinTimeLimit
*Emitted when the join time limit for a cohort is updated.*


```solidity
event UpdatedJoinTimeLimit(uint256 oldJoinTimeLimit, uint256 newJoinTimeLimit);
```

### UpdatedMaxCohortSize
*Emitted when the maximum cohort size is updated.*


```solidity
event UpdatedMaxCohortSize(uint256 oldCohortSizeLimit, uint256 newCohortSizeLimit);
```

### UpdatedShareThreshold
*Emitted when the share threshold for a cohort is updated.*


```solidity
event UpdatedShareThreshold(uint256 oldShareThreshold, uint256 newShareThreshold);
```

### UpdatedMinimumStake
*Emitted when the minimum stake for a cohort is updated.*


```solidity
event UpdatedMinimumStake(uint256 oldMinimumStake, uint256 newMinimumStake);
```

### UpdatedStakeDuration
*Emitted when the stake duration for a cohort is updated.*


```solidity
event UpdatedStakeDuration(uint256 oldStakeDuration, uint256 newStakeDuration);
```

### Feedback
*Emitted when a user submits feedback to the DAO.*


```solidity
event Feedback(address user, address dao, string feedback);
```

