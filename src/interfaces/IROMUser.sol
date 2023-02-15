// SPDX-License-Identifier: MIT
// @author huntrr / Raid Guild
pragma solidity ^0.8.13;


// todo: change this contract into an interface
interface IRiteOfMolochUser {
    function joinInitiation(address user) external;

    /**
     * @dev Allows DAO members to claim their initiation stake
     */
    function claimStake() external;

    /**
     * @dev Allows initiates to log permanent feedback data on-chain
     * @param feedback "Developers do something!"
     * Doesn't change contract state; simply passes call-data through an event
     */
    function cryForHelp(string calldata feedback) external;

    function checkStake(address user) external view returns (uint256);
    
    /**
     * @dev returns the user's deadline for onboarding
     */
    function getDeadline(address user) external view returns (uint256);

    /**
     * @dev returns the user's member status
     */
    function isMember(address user) external view returns (bool);
}