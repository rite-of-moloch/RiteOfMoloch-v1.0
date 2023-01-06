// SPDX-License-Identifier: MIT
// @author st4rgard3n, bitbeckers, MrDeadce11, huntrr / Raid Guild
pragma solidity ^0.8.4;

import "lib/openzeppelin-contracts/contracts/proxy/Clones.sol";
import "src/RiteOfMoloch.sol";
import "src/InitializationData.sol";
import "src/hats/HatsAccessControl.sol";

contract RiteOfMolochFactory is InitializationData, HatsAccessControl {
    bytes32 public constant FACTORY_OPERATOR = keccak256("FACTORY_OPERATOR");

    mapping(bytes32 => RoleData) public _roles;

    event NewRiteOfMoloch(
        address cohortContract,
        address deployer,
        address implementation,
        address membershipCriteria,
        address stakingAsset,
        address treasury,
        address topHatWearer,
        uint256 threshold,
        uint256 assetAmount,
        uint256 stakeDuration
    );

    // access an existing implementation of cohort staking sbt contracts
    mapping(uint256 => address) public implementations;

    // the unique identifier used to select which implementation to use for a new cohort
    uint256 public iid;

    // Hats protocol implementations
    address public hatsProtocol;

    // Hats factory operator
    uint256 public factoryOperatorHat;

    /**
     * @param _hatsProtocol implementations:
     * Polygon = 0x95647f88dcbc12986046fc4f49064edd11a25d38
     * Gnosis = 0x6B49b86D21aBc1D60611bD85c843a9766B5493DB
     * Georli = 0xcf912a0193593f5cD55D81FF611c26c3ED63f924
     */
    constructor(address _hatsProtocol, uint256 _factoryOperatorHat) {
        // point to Hats implementation
        hatsProtocol = _hatsProtocol;

        // point access control functionality to Hats protocol
        _changeHatsContract(hatsProtocol);

        // increment the implementation id
        iid = 1;

        // deploy the initial rite of moloch implementation and set it in implementations mapping
        implementations[iid] = address(new RiteOfMoloch());

        // assign admin roles to deployer
        _grantRole(FACTORY_OPERATOR, _factoryOperatorHat);
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
            initData.threshold,
            initData.assetAmount,
            initData.stakeDuration
        );

        return clone;
    }

    /**
     * @dev marks a deployed contract as a suitable implementation for additional cohort formats
     * @param implementation the contract address for new cohort format logic
     */
    function addImplementation(address implementation)
        external
        onlyRole(FACTORY_OPERATOR)
    {
        iid++;
        implementations[iid] = implementation;
    }

    // point to new Hats protocol implementation
    function changeHatsProtocol(address _hatsProtocol)
        public
        onlyRole(FACTORY_OPERATOR)
    {
        hatsProtocol = _hatsProtocol;
    }
}
