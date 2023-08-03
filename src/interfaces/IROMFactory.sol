// SPDX-License-Identifier: MIT
// @author huntrr / Raid Guild
pragma solidity ^0.8.13;

import { IInitData } from "src/interfaces/IInitData.sol";

// todo: change this contract into an interface
interface IRiteOfMolochFactory is IInitData {
    /**
     *
     *  EVENTS
     *
     */

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

    event AddedImplementation(uint256 id, address romImplementation);
    event UpdatedHatsProtocol(address oldHatsProtocol, address newHatsProtocol);
    event UpdatedSustainabilityFee(uint256 oldSustainabilityFee, uint256 newSustainabilityFee);
    event UpdatedSustainabilityTreasury(address oldSustainabilityTreasury, address newSustainabilityTreasury);

    /**
     *
     *  FUNCTIONS
     *
     */

    /**
     * @dev Deploys a new clone proxy instance for cohort staking
     * @param initData the complete data for initializing a new cohort
     * @param implementationSelector points to a logic contract implementation
     */
    function createCohort(
        InitData calldata initData,
        uint256 implementationSelector
    )
        external
        payable
        returns (address);

    /**
     * @dev marks a deployed contract as a suitable implementation for additional cohort formats
     * @param implementation the contract address for new cohort format logic
     */
    function addImplementation(address implementation) external;

    // point to new Hats protocol implementation
    function updateHatsProtocol(address _hatsProtocol) external;

    function updateSustainabilityFee(uint256 _sustainabilityFee) external;

    function updateSustainabilityTreasury(address _sustainabilityTreasury) external;
}
