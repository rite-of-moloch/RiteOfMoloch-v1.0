// SPDX-License-Identifier: MIT
// @author huntrr / Raid Guild
pragma solidity ^0.8.13;

interface IRiteOfMolochEvents {
    /**
     *
     *  EVENTS
     *
     */

    // logs new initiation data
    event Initiation(address newInitiate, address benefactor, uint256 tokenId, uint256 stake, uint256 deadline);

    // logs data when failed initiates get slashed
    event Sacrifice(address sacrifice, uint256 slashedAmount, address slasher);

    // logs data when a user successfully claims back their stake
    event Claim(address newMember, uint256 claimAmount);

    /**
     * @dev Emitted when the join time duration for a cohort is updated.
     * @param oldJoinTimeDuration The old join time duration value.
     * @param newJoinTimeDuration The new join time duration value.
     */
    event UpdatedJoinTimeDuration(uint256 oldJoinTimeDuration, uint256 newJoinTimeDuration);

    /**
     * @dev Emitted when the join time limit for a cohort is updated.
     * @param oldJoinTimeLimit The old join time limit value.
     * @param newJoinTimeLimit The new join time limit value.
     */
    event UpdatedJoinTimeLimit(uint256 oldJoinTimeLimit, uint256 newJoinTimeLimit);

    /**
     * @dev Emitted when the maximum cohort size is updated.
     * @param oldCohortSizeLimit The old maximum cohort size value.
     * @param newCohortSizeLimit The new maximum cohort size value.
     */
    event UpdatedMaxCohortSize(uint256 oldCohortSizeLimit, uint256 newCohortSizeLimit);

    /**
     * @dev Emitted when the share threshold for a cohort is updated.
     * @param oldShareThreshold The old share threshold value.
     * @param newShareThreshold The new share threshold value.
     */
    event UpdatedShareThreshold(uint256 oldShareThreshold, uint256 newShareThreshold);

    /**
     * @dev Emitted when the minimum stake for a cohort is updated.
     * @param oldMinimumStake The old minimum stake value.
     * @param newMinimumStake The new minimum stake value.
     */
    event UpdatedMinimumStake(uint256 oldMinimumStake, uint256 newMinimumStake);

    /**
     * @dev Emitted when the stake duration for a cohort is updated.
     * @param oldStakeDuration The old stake duration value.
     * @param newStakeDuration The new stake duration value.
     */
    event UpdatedStakeDuration(uint256 oldStakeDuration, uint256 newStakeDuration);

    /**
     * @dev Emitted when a user submits feedback to the DAO.
     * @param user The address of the user who submitted the feedback.
     * @param dao The address of the DAO that received the feedback.
     * @param feedback The feedback message that was submitted.
     */
    event Feedback(address user, address dao, string feedback);
}
