// SPDX-License-Identifier: MIT
// @author st4rgard3n, bitbeckers, MrDeadce11, huntrr / Raid Guild
pragma solidity ^0.8.4;

import "lib/openzeppelin-contracts/contracts/proxy/Clones.sol";
import "lib/openzeppelin-contracts/contracts/access/AccessControl.sol";
import "src/RiteOfMoloch.sol";
import "./InitializationData.sol";

// todo: Hats Access Control?
contract RiteOfMolochFactory is InitializationData, AccessControl {
    bytes32 public constant ADMIN = keccak256("ADMIN");

    event NewRiteOfMoloch(
        address cohortContract,
        address deployer,
        address implementation,
        address membershipCriteria,
        address stakingAsset,
        address treasury,
        address topHatWearer,
        uint256 cohortSize,
        uint256 joinDuration,
        uint256 threshold,
        uint256 assetAmount,
        uint256 stakeDuration,
        uint256 chainId,
        uint256 topHatId,
        string cohortName
    );

    // access an existing implementation of cohort staking sbt contracts
    mapping(uint256 => address) public implementations;

    // Hats protocol implementations
    mapping(uint256 => address) hatsProtocols;

    // the unique identifier used to select which implementation to use for a new cohort
    uint256 public iid;

    constructor() {
        // increment the implementation id
        iid = 1;

        // deploy the initial rite of moloch implementation and set it in implementations mapping
        implementations[iid] = address(new RiteOfMoloch());

        // assign admin roles to deployer
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN, msg.sender);
    }

    /**
     * @dev Deploys a new clone proxy instance for cohort staking
     * @param initData the complete data for initializing a new cohort
     * @param implementationSelector points to a logic contract implementation
     */
    function createCohort(
        InitData calldata initData,
        uint256 implementationSelector
    ) external returns (address) {
        // enforce that a valid implementation is selected
        require(
            implementationSelector > 0 && implementationSelector <= iid,
            "!implementation"
        );

        // lookup correct Hats protocol implementation
        address hatsProtocol = hatsProtocols[initData.chainId];

        // deploy cohort clone proxy with a certain implementation
        address clone = Clones.clone(implementations[implementationSelector]);

        // initialize the cohort clone
        RiteOfMoloch(clone).initialize(initData, hatsProtocol, msg.sender);

        emit NewRiteOfMoloch(
            clone,
            msg.sender,
            implementations[implementationSelector],
            initData.membershipCriteria,
            initData.stakingAsset,
            initData.treasury,
            initData.topHatWearer,
            initData.cohortSize,
            initData.joinDuration,
            initData.threshold,
            initData.assetAmount,
            initData.stakeDuration,
            initData.chainId,
            initData.topHatId,
            initData.cohortName
        );

        return clone;
    }

    /**
     * @dev marks a deployed contract as a suitable implementation for additional cohort formats
     * @param implementation the contract address for new cohort format logic
     */

    function addImplementation(address implementation)
        external
        onlyRole(ADMIN)
    {
        iid++;
        implementations[iid] = implementation;
    }

    // todo: add security
    function addHatsProtocol(uint256 _chainId, address _hatsProtocol)
        public
        onlyRole(ADMIN)
    {
        hatsProtocols[_chainId] = _hatsProtocol;
    }
}
