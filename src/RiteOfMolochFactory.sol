// SPDX-License-Identifier: MIT
// @author st4rgard3n, bitbeckers, MrDeadce11, huntrr / Raid Guild
pragma solidity ^0.8.13;

import {Clones} from "lib/openzeppelin-contracts/contracts/proxy/Clones.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";
import {IRiteOfMolochFactory} from "src/interfaces/IROMFactory.sol";
import {HatsAccessControl} from "hats-auth/HatsAccessControl.sol";

contract RiteOfMolochFactory is IRiteOfMolochFactory, HatsAccessControl {
    bytes32 public constant FACTORY_OPERATOR = keccak256("FACTORY_OPERATOR");

    // access an existing implementation of cohort staking sbt contracts
    mapping(uint256 => address) public implementations;

    // the unique identifier used to select which implementation to use for a new cohort
    uint256 public iid;

    // Hats protocol implementations
    address public hatsProtocol;

    // Hats factory operator
    uint256 public factoryOperatorHat;

    // address that receives `adminFee` when initiates are slashed
    address public sustainabilityTreasury;

    // percentage fee of sacrifice stake that goes to admin
    uint256 public sustainabilityFee;

    /**
     * @param _hatsProtocol current release: 0x96bD657Fcc04c71B47f896a829E5728415cbcAa1
     */
    constructor(
        address _hatsProtocol,
        uint256 _factoryOperatorHat,
        address _sustainabilityTreasury,
        uint256 _sustainabilityFee
    ) {
        // point to Hats implementation
        hatsProtocol = _hatsProtocol;

        // point access control functionality to Hats protocol
        _changeHatsContract(hatsProtocol);

        sustainabilityTreasury = _sustainabilityTreasury;

        sustainabilityFee = _sustainabilityFee;
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
    function createCohort(InitData calldata initData, uint256 implementationSelector)
        external
        payable
        returns (address)
    {
        // enforce that a valid implementation is selected
        require(implementationSelector <= iid, "!implementation");

        // deploy cohort clone proxy with a certain implementation
        address clone = Clones.clone(implementations[implementationSelector]);

        // initialize the cohort clone
        RiteOfMoloch(clone).initialize{value: msg.value}(
            initData, hatsProtocol, msg.sender, sustainabilityTreasury, sustainabilityFee
        );

        emit NewRiteOfMoloch(
            clone,
            msg.sender,
            implementations[implementationSelector],
            initData.membershipCriteria,
            initData.stakingAsset,
            initData.daoTreasury,
            initData.threshold,
            initData.assetAmount,
            initData.stakeDuration,
            initData.baseUri
        );

        return clone;
    }

    /**
     * @dev marks a deployed contract as a suitable implementation for additional cohort formats
     * @param implementation the contract address for new cohort format logic
     */
    function addImplementation(address implementation) external onlyRole(FACTORY_OPERATOR) {
        iid++;
        implementations[iid] = implementation;
    }

    // point to new Hats protocol implementation
    function changeHatsProtocol(address _hatsProtocol) public onlyRole(FACTORY_OPERATOR) {
        hatsProtocol = _hatsProtocol;
        _changeHatsContract(_hatsProtocol);
    }

    function updateSustainabilityFee(uint256 fee) external onlyRole(FACTORY_OPERATOR) {
        require(fee <= 1e6, "Sustainability fee too high");
        sustainabilityFee = fee;
    }

    function updateSustainabilityTreasury(address newSustainabilityTreasury) external onlyRole(FACTORY_OPERATOR) {
        sustainabilityTreasury = newSustainabilityTreasury;
    }
}
