// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "test/TestHelper.sol";

import { HatsAccessControl } from "hats-auth/HatsAccessControl.sol";
import { IRiteOfMolochEvents } from "src/interfaces/IROMEvents.sol";

/**
 * @dev see note on TestHelper
 */
contract ConfigTest is TestHelper {
    bytes32 public constant FACTORY_OPERATOR = keccak256("FACTORY_OPERATOR");

    address _attacker = address(666);

    function setUp() public override {
        TestHelper.setUp();
    }
    /**
     * TESTS
     */

    function testAddImplementation() public {
        address implementation = address(new RiteOfMoloch());
        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(
                HatsAccessControl.NotWearingRoleHat.selector, FACTORY_OPERATOR, factoryOperatorHat, _attacker
            )
        );
        romFactory.addImplementation(implementation);
        vm.stopPrank();

        vm.startPrank(factoryAdmin);

        vm.expectRevert("Implementation can not be zero address");
        romFactory.addImplementation(address(0));

        vm.expectEmit(false, false, false, true);
        emit AddedImplementation(1, implementation);
        romFactory.addImplementation(implementation);

        vm.stopPrank();

        assertEq(romFactory.implementations(1), implementation);
    }

    function testChangeHatsProtocol() public {
        address newHats = address(new Hats("Updated-Hats", ""));
        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(
                HatsAccessControl.NotWearingRoleHat.selector, FACTORY_OPERATOR, factoryOperatorHat, _attacker
            )
        );
        romFactory.changeHatsProtocol(newHats);
        vm.stopPrank();

        vm.startPrank(factoryAdmin);

        vm.expectRevert("Hats protocol can not be zero address");
        romFactory.changeHatsProtocol(address(0));

        address oldHats = address(romFactory.hatsProtocol());

        vm.expectEmit(true, true, false, true);
        emit HatsContractChanged(oldHats, newHats);
        romFactory.changeHatsProtocol(newHats);

        vm.stopPrank();

        assertEq(romFactory.hatsProtocol(), newHats);
    }

    function testUpdateSustainabilityFee(uint256 newFee) public {
        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(
                HatsAccessControl.NotWearingRoleHat.selector, FACTORY_OPERATOR, factoryOperatorHat, _attacker
            )
        );
        romFactory.updateSustainabilityFee(newFee);
        vm.stopPrank();

        vm.startPrank(factoryAdmin);

        if (newFee > 1e6) {
            vm.expectRevert("Sustainability fee too high");
            romFactory.updateSustainabilityFee(newFee);

            assertEq(romFactory.sustainabilityFee(), sustainabilityFee);
        } else {
            vm.expectEmit(false, false, false, true);
            emit UpdatedSustainabilityFee(sustainabilityFee, newFee);
            romFactory.updateSustainabilityFee(newFee);

            assertEq(romFactory.sustainabilityFee(), newFee);
        }

        vm.stopPrank();
    }

    function testUpdateSustainabilityTreasury() public {
        address newTreasury = address(9999);
        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(
                HatsAccessControl.NotWearingRoleHat.selector, FACTORY_OPERATOR, factoryOperatorHat, _attacker
            )
        );
        romFactory.updateSustainabilityTreasury(newTreasury);
        vm.stopPrank();

        vm.startPrank(factoryAdmin);

        vm.expectRevert("Treasury can not be zero address");
        romFactory.updateSustainabilityTreasury(address(0));

        vm.expectEmit(false, false, false, true);
        emit UpdatedSustainabilityTreasury(sustainabilityTreasury, newTreasury);
        romFactory.updateSustainabilityTreasury(newTreasury);

        vm.stopPrank();

        assertEq(romFactory.sustainabilityTreasury(), newTreasury);
    }
}
