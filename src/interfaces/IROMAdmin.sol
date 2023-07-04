// SPDX-License-Identifier: MIT
// @author huntrr / Raid Guild
pragma solidity ^0.8.13;

import {IInitData} from "src/interfaces/IInitData.sol";

// todo: change this contract into an interface
interface IRiteOfMolochAdmin is IInitData {
    function initialize(
        InitData calldata initData,
        address hatsProtocol,
        address caller_,
        address _sustainabilityTreasury,
        uint256 _sustainabilityFee
    ) external payable;

    function changeJoinTimeDuration(uint256 _joinDuration) external;

    function extendJoinTimeLimit(uint256 _extension) external;

    function changeJoinSizeLimit(uint256 _cohortSize) external;

    /**
     * @dev Allows DAO members to change the staking requirement
     * @param newMinimumStake the minimum quantity of tokens a user must stake to join the cohort
     */
    function setMinimumStake(uint256 newMinimumStake) external;

    /**
     * @dev Allows changing the DAO member share threshold
     * @param newShareThreshold the number of shares required to be considered a DAO member
     */
    function setShareThreshold(uint256 newShareThreshold) external;

    /**
     * @dev Allows changing the maximum initiation duration
     * @param newMaxTime the length in seconds until an initiate's stake is forfeit
     */
    function setMaxDuration(uint256 newMaxTime) external;

    /**
     * @dev If ROM is a Shaman: Allows minting shares of Baal DAO to become member
     * @param to the list of initiate addresses who have passed their rites to become member
     */
    function batchMintBaalShares(address[] calldata to) external;

    /**
     * @param _to initiate address who has passed their rite to become member
     */
    function singleMintBaalShares(address _to) external;

    /**
     * @dev Bleeds the life force of failed initiates into the treasury
     */
    function sacrifice() external;

    /**
     * @dev Bleeds the life force of a single failed initiate into the treasury
     */
    function slaughter(address _sacrificialLamb) external;
}
