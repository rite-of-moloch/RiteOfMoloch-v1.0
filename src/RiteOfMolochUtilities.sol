// SPDX-License-Identifier: MIT
// @author huntrr / Raid Guild
pragma solidity ^0.8.13;

import {IBaal} from "src/baal/IBaal.sol";

// todo: change this contract into an interface
contract RiteOfMolochUtilities {
    // Baal DAO
    IBaal private baal;

    // Hats protocol
    address private HATS;

    /*************************
     EVENTS
     *************************/

    // logs new initiation data
    event Initiation(
        address newInitiate,
        address benefactor,
        uint256 tokenId,
        uint256 stake,
        uint256 deadline
    );

    // logs data when failed initiates get slashed
    event Sacrifice(address sacrifice, uint256 slashedAmount, address slasher);

    // logs data when a user successfully claims back their stake
    event Claim(address newMember, uint256 claimAmount);

    // log the new staking requirement
    event ChangedStake(uint256 newStake);

    // log the new minimum shares for DAO membership
    event ChangedShares(uint256 newShare);

    // log the new duration before an initiate can be slashed
    event ChangedTime(uint256 newTime);

    // log feedback data on chain for aggregation and graph
    event Feedback(address user, address treasury, string feedback);
}
