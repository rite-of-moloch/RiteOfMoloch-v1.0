// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "test/TestHelper.sol";
import "openzeppelin-contracts/token/ERC20/ERC20.sol";

import { HatsAccessControl } from "hats-auth/HatsAccessControl.sol";

/**
 * @dev see note on TestHelper
 */
contract ConfigTest is TestHelper {
    event Feedback(address user, address treasury, string feedback);

    bytes32 public constant ADMIN = keccak256("ADMIN");

    address admin;
    address _attacker = address(666);

    uint256 adminHat;

    function setUp() public override {
        TestHelper.setUp();
        admin = alice;

        adminHat = riteOfMoloch.adminHat();
    }
    /**
     * TESTS
     */

    function testChangeJoinTimeDuration(uint256 duration) public {
        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(HatsAccessControl.NotWearingRoleHat.selector, ADMIN, adminHat, _attacker)
        );
        riteOfMoloch.changeJoinTimeDuration(duration);
        vm.stopPrank();

        vm.startPrank(admin);

        riteOfMoloch.changeJoinTimeDuration(duration);

        vm.stopPrank();

        assertEq(riteOfMoloch.joinDuration(), duration);
    }

    function testExtendJoinTimeLimit(uint256 timeLimit) public {
        // Hack to not overflow
        vm.assume(timeLimit < type(uint256).max - riteOfMoloch.joinEndTime());
        uint256 currentLimit = riteOfMoloch.joinEndTime();
        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(HatsAccessControl.NotWearingRoleHat.selector, ADMIN, adminHat, _attacker)
        );
        riteOfMoloch.extendJoinTimeLimit(timeLimit);
        vm.stopPrank();

        vm.startPrank(admin);

        riteOfMoloch.extendJoinTimeLimit(timeLimit);

        vm.stopPrank();

        assertEq(riteOfMoloch.joinEndTime(), currentLimit + timeLimit);
    }

    function testExtendJoinSizeLimit(uint256 sizeLimit) public {
        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(HatsAccessControl.NotWearingRoleHat.selector, ADMIN, adminHat, _attacker)
        );
        riteOfMoloch.changeJoinSizeLimit(sizeLimit);
        vm.stopPrank();

        vm.startPrank(admin);

        riteOfMoloch.changeJoinSizeLimit(sizeLimit);

        vm.stopPrank();

        assertEq(riteOfMoloch.cohortSize(), sizeLimit);
    }
}
