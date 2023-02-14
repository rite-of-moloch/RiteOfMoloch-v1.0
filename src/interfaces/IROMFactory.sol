// SPDX-License-Identifier: MIT
// @author huntrr / Raid Guild
pragma solidity ^0.8.13;


import {IInitData} from "src/interfaces/IInitData.sol";

// todo: change this contract into an interface
interface IRiteOfMolochFactory is IInitData {

    /*************************
     EVENTS
     *************************/

    event NewRiteOfMoloch(
        address cohortContract,
        address deployer,
        address implementation,
        address membershipCriteria,
        address stakingAsset,
        address treasury,
        uint256 threshold,
        uint256 assetAmount,
        uint256 stakeDuration,
        string sbtUrl
    );

    /*************************
     FUNCTIONS
     *************************/
     
    /**
     * @dev Deploys a new clone proxy instance for cohort staking
     * @param initData the complete data for initializing a new cohort
     * @param implementationSelector points to a logic contract implementation
     */
    function createCohort(
        InitData calldata initData,
        uint256 implementationSelector
    ) external returns (address);

    /**
     * @dev marks a deployed contract as a suitable implementation for additional cohort formats
     * @param implementation the contract address for new cohort format logic
     */
    function addImplementation(address implementation) external;

    // point to new Hats protocol implementation
    function changeHatsProtocol(address _hatsProtocol) external;
}