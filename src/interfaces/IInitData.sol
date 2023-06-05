// SPDX-License-Identifier: MIT
// @author st4rgard3n, bitbeckers, MrDeadce11, huntrr / Raid Guild
pragma solidity ^0.8.13;

interface IInitData {
    // object is used to initialize new cohorts

    // PARAMS:
    // membershipCriteria_ (BaalV3 DAO address) the contract address read from in order to ascertain cohort completion
    // stakingAsset_ (tokenAddress) the contract address for the asset which is staked into the cohort contract
    // treasury_ address that receives tokens when initiates are slashed (e.g. Gnosis safe, smart contract, etc.)
    // topHatWearer_ [OPTIONAL] address of topHat (DAO address that wears topHat)
    // admin1_ [OPTIONAL] address of cohort admin
    // admin2_ [OPTIONAL] address of cohort admin
    // cohortSize_ the limit of cohort attendees that can join/stake
    // joinDuration_ the time limit for cohort attendees to join/stake
    // threshold_ (shares in DAO) the minimum amount of criteria which constitutes membership
    // assetAmount_ (staking amount) the minimum amount of staking asset required to join the cohort
    // stakeDuration_ the time limit beginning from time of stake for cohort attendee to achieve DAO membership
    // topHatId_ [OPTIONAL] topHat ID of topHatWearer
    // cohortName_ name of cohort
    // stbName_ the name for the cohort's soul bound tokens (SBT)
    // sbtSymbol_ the ticker symbol for cohort's SBT
    // baseURI_ the uniform resource identifier for accessing SBT metadata
    // shamanOn_ automate Shaman proposal request to DAO

    struct InitData {
        address membershipCriteria;
        address stakingAsset;
        address daoTreasury;
        address admin1;
        address admin2;
        uint256 cohortSize;
        uint256 joinDuration;
        uint256 threshold;
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
