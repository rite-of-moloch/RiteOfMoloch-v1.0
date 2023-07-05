// SPDX-License-Identifier: MIT
// @author st4rgard3n, bitbeckers, MrDeadce11, huntrr / Raid Guild
pragma solidity ^0.8.13;

interface IInitData {
    // object is used to initialize new cohorts

    // PARAMS:
    // membershipCriteria (BaalV3 DAO address) the contract address read from in order to ascertain cohort completion
    // stakingAsset (tokenAddress) the contract address for the asset which is staked into the cohort contract
    // treasury address that receives tokens when initiates are slashed (e.g. Gnosis safe, smart contract, etc.)
    // topHatWearer [OPTIONAL] address of topHat (DAO address that wears topHat)
    // admin1 [OPTIONAL] address of cohort admin
    // admin2 [OPTIONAL] address of cohort admin
    // cohortSize the limit of cohort attendees that can join/stake
    // joinDuration the time limit for cohort attendees to join/stake
    // shareThreshold (shares in DAO) the minimum amount of criteria which constitutes membership
    // assetAmount (staking amount) the minimum amount of staking asset required to join the cohort
    // stakeDuration the time limit beginning from time of stake for cohort attendee to achieve DAO membership
    // topHatId [OPTIONAL] topHat ID of topHatWearer
    // cohortName name of cohort
    // stbName the name for the cohort's soul bound tokens (SBT)
    // sbtSymbol the ticker symbol for cohort's SBT
    // baseURI the uniform resource identifier for accessing SBT metadata
    // shamanOn automate Shaman proposal request to DAO

    //TODO packing; many values don't need 256 range
    struct InitData {
        address membershipCriteria;
        address stakingAsset;
        address daoTreasury;
        address admin1;
        address admin2;
        uint256 cohortSize;
        uint256 joinDuration;
        uint256 shareThreshold;
        uint256 assetAmount;
        uint256 stakeDuration;
        uint256 topHatId;
        string cohortName;
        string sbtName;
        string sbtSymbol;
        string baseUri;
        bool shamanOn;
    }
}
