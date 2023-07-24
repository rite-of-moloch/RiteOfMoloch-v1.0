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
        vm.expectRevert("Ownable: caller is not the owner");
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

    function testUpdateHatsProtocol() public {
        address newHats = address(new Hats("Updated-Hats", ""));
        vm.startPrank(_attacker);
        vm.expectRevert("Ownable: caller is not the owner");

        romFactory.updateHatsProtocol(newHats);
        vm.stopPrank();

        vm.startPrank(factoryAdmin);

        vm.expectRevert("Hats protocol can not be zero address");
        romFactory.updateHatsProtocol(address(0));

        address oldHats = address(romFactory.hatsProtocol());

        vm.expectEmit(true, true, false, true);
        emit UpdatedHatsProtocol(oldHats, newHats);
        romFactory.updateHatsProtocol(newHats);

        vm.stopPrank();

        assertEq(romFactory.hatsProtocol(), newHats);
    }

    function testUpdateSustainabilityFee(uint256 newFee) public {
        vm.startPrank(_attacker);
        vm.expectRevert("Ownable: caller is not the owner");

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
        vm.expectRevert("Ownable: caller is not the owner");

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
