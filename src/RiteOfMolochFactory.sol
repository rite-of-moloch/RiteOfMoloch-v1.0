// SPDX-License-Identifier: MIT
// @author st4rgard3n, bitbeckers, MrDeadce11, huntrr / Raid Guild
pragma solidity ^0.8.13;

import { Clones } from "lib/openzeppelin-contracts/contracts/proxy/Clones.sol";
import { RiteOfMoloch } from "src/RiteOfMoloch.sol";
import { IRiteOfMolochFactory } from "src/interfaces/IROMFactory.sol";
import { HatsAccessControl } from "hats-auth/HatsAccessControl.sol";

contract RiteOfMolochFactory is IRiteOfMolochFactory, HatsAccessControl {
    bytes32 public constant FACTORY_OPERATOR = keccak256("FACTORY_OPERATOR");

    // access an existing implementation of cohort staking sbt contracts
    mapping(uint256 => address) public implementations;

    // the unique identifier used to select which implementation to use for a new cohort
    uint256 public iid;

    // Hats protocol implementations
    address public hatsProtocol;

    // address that receives `adminFee` when initiates are slashed
    address public sustainabilityTreasury;

    // percentage fee of sacrifice stake that goes to admin
    uint256 public sustainabilityFee;

    /**
     * @param _hatsProtocol
     */

    /**
     * @dev Initializes a new instance of the RiteOfMolochFactory contract.
     * @param _implementation The address of the initial RiteOfMoloch implementation contract.
     * @param _hatsProtocol The address of the Hats protocol implementation contract (current release:
     * 0x96bD657Fcc04c71B47f896a829E5728415cbcAa1).
     * @param _factoryOperatorHat The ID of the hat to assign to the factory operator role.
     * @param _sustainabilityTreasury The address of the sustainability treasury contract.
     * @param _sustainabilityFee The sustainability fee percentage to apply to new cohorts.
     *
     * @notice This function initializes a new instance of the RiteOfMolochFactory contract. It sets the `hatsProtocol`
     * variable to the provided Hats protocol implementation address, calls the `_changeHatsContract` function with this
     * address to configure access control functionality, and sets the `sustainabilityTreasury` and `sustainabilityFee`
     * variables to the provided values. It then configures the initial RiteOfMoloch implementation contract with the
     * provided address and stores it in the `implementations` mapping. Finally, it assigns the factory operator role to
     * the deployer with the provided hat ID.
     *
     */
    constructor(
        address _implementation,
        address _hatsProtocol,
        uint256 _factoryOperatorHat,
        address _sustainabilityTreasury,
        uint256 _sustainabilityFee
    ) {
        // point to Hats implementation
        hatsProtocol = _hatsProtocol;

        // point access control functionality to Hats protocol
        _changeHatsContract(hatsProtocol);

        // Configure sustainability fee and treasury
        sustainabilityTreasury = _sustainabilityTreasury;
        sustainabilityFee = _sustainabilityFee;

        // deploy the initial rite of moloch implementation and set it in implementations mapping
        implementations[iid] = _implementation;
        emit AddedImplementation(iid, _implementation);

        // assign admin roles to deployer
        _grantRole(FACTORY_OPERATOR, _factoryOperatorHat);
    }

    /**
     * @dev Allows anyone to create a new cohort contract.
     * @param initData The initialization data for the new cohort contract.
     * @param implementationSelector The ID of the implementation contract to use for the new cohort contract.
     *
     * @notice This function allows anyone to create a new cohort contract. It first checks that a valid implementation
     * is selected. If the check passes, the function deploys a cohort clone proxy with the selected implementation and
     * initializes it with the provided initialization data. It then emits a `NewRiteOfMoloch` event with information
     * about the new cohort contract. Finally, it returns the address of the new cohort contract.
     *
     */
    function createCohort(
        InitData calldata initData,
        uint256 implementationSelector
    )
        external
        payable
        returns (address)
    {
        // enforce that a valid implementation is selected
        require(implementationSelector <= iid, "!implementation");

        // deploy cohort clone proxy with a certain implementation
        address clone = Clones.clone(implementations[implementationSelector]);

        // initialize the cohort clone
        RiteOfMoloch(clone).initialize{ value: msg.value }(
            initData, hatsProtocol, msg.sender, sustainabilityTreasury, sustainabilityFee
        );

        emit NewRiteOfMoloch(
            clone,
            msg.sender,
            implementations[implementationSelector],
            initData.membershipCriteria,
            initData.stakingAsset,
            initData.daoTreasury,
            initData.shareThreshold,
            initData.assetAmount,
            initData.stakeDuration,
            initData.baseUri
        );

        return clone;
    }

    /**
     * @dev Allows the factory operator to add a new implementation contract for additional cohort formats.
     * @param implementation The address of the new implementation contract to add.
     *
     * @notice This function allows the factory operator to add a new implementation contract for additional cohort
     * formats. It first checks that the new implementation address is not the zero address. If the check passes, the
     * function assigns a new ID to the implementation, adds it to the `implementations` mapping, and emits an
     * `AddedImplementation` event with the ID and implementation address.
     *
     */
    function addImplementation(address implementation) external onlyRole(FACTORY_OPERATOR) {
        require(implementation != address(0), "Implementation can not be zero address");

        iid++;
        implementations[iid] = implementation;
        emit AddedImplementation(iid, implementation);
    }

    /**
     * @dev Allows the factory operator to change the Hats protocol implementation.
     * @param _hatsProtocol The address of the new Hats protocol implementation to set.
     *
     * @notice This function allows the factory operator to change the Hats protocol implementation. It first checks
     * that the
     * new Hats protocol address is not the zero address. If the check passes, the function updates the `hatsProtocol`
     * variable and calls the `_changeHatsContract` function provided by Hats protocol.
     *
     */
    function changeHatsProtocol(address _hatsProtocol) external onlyRole(FACTORY_OPERATOR) {
        require(_hatsProtocol != address(0), "Hats protocol can not be zero address");

        hatsProtocol = _hatsProtocol;
        _changeHatsContract(_hatsProtocol);
    }

    /**
     * @dev Allows the factory operator to update the sustainability fee.
     * @param fee The new sustainability fee to set.
     *
     * @notice This function allows the factory operator to update the sustainability fee. It first checks that the new
     * fee is not greater than 1e6. If the check passes, the function updates the `sustainabilityFee` variable and emits
     * an `UpdatedSustainabilityFee` event with the old and new fees.
     *
     */
    function updateSustainabilityFee(uint256 fee) external onlyRole(FACTORY_OPERATOR) {
        require(fee <= 1e6, "Sustainability fee too high");

        uint256 oldSustainabilityFee = sustainabilityFee;
        sustainabilityFee = fee;

        emit UpdatedSustainabilityFee(oldSustainabilityFee, fee);
    }

    /**
     * @dev Allows the factory operator to update the sustainability treasury.
     * @param newSustainabilityTreasury The new sustainability treasury address to set.
     *
     * @notice This function allows the factory operator to update the sustainability treasury. It first checks that the
     * new treasury address is not the zero address. If the check passes, the function updates the
     * `sustainabilityTreasury` variable and emits an `UpdatedSustainabilityTreasury` event with the old and new
     * treasury addresses.
     *
     */
    function updateSustainabilityTreasury(address newSustainabilityTreasury) external onlyRole(FACTORY_OPERATOR) {
        require(newSustainabilityTreasury != address(0), "Treasury can not be zero address");
        address oldSustainabilityTreasury = sustainabilityTreasury;
        sustainabilityTreasury = newSustainabilityTreasury;

        emit UpdatedSustainabilityTreasury(oldSustainabilityTreasury, newSustainabilityTreasury);
    }
}
