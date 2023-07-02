// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "test/TestHelper.sol";
import {HatsAccessControl} from "hats-auth/HatsAccessControl.sol";

// forge test --match-contract AccessControl -vv

/**
 * @dev see note on TestHelper
 */
contract AccessControl is TestHelper {
    bytes32 public constant SUPER_ADMIN = keccak256("SUPER_ADMIN");
    bytes32 public constant ADMIN = keccak256("ADMIN");
    address admin;
    address user;
    address attacker;

    function setUp() public override {
        TestHelper.setUp();
        admin = alice;
        user = bob;
        attacker = charlie;
    }

    /**
     * TESTS
     */
    function testAdminPermissionsFuzz(uint256 deployerValue, uint256 adminValue) public {
        vm.assume(deployerValue > 0);
        vm.assume(adminValue > 0);

        // Deployer wears the admin hat
        changeSettings(deployer, deployerValue);

        assertEq(ROM.minimumStake(), deployerValue);
        assertEq(ROM.minimumShare(), deployerValue);
        assertEq(ROM.maximumTime(), deployerValue);

        // Admin wears the admin hat
        changeSettings(admin, adminValue);

        assertEq(ROM.minimumStake(), adminValue);
        assertEq(ROM.minimumShare(), adminValue);
        assertEq(ROM.maximumTime(), adminValue);
    }

    function testAdminSecurityFuzz(address attacker) public {
        vm.assume(attacker != deployer);
        vm.assume(attacker != admin);

        uint256 adminHat = ROM.adminHat();

        // charlie should not be able to call admin functions
        vm.startPrank(attacker);

        vm.expectRevert(abi.encodeWithSelector(HatsAccessControl.NotWearingRoleHat.selector, ADMIN, adminHat, attacker));
        ROM.setMinimumStake(40);
        assertEq(ROM.minimumStake(), minStake);

        vm.stopPrank();
    }

    // UTILS
    function changeSettings(address admin, uint256 n) public {
        vm.startPrank(admin);

        ROM.setMinimumStake(n);
        ROM.setShareThreshold(n);
        ROM.setMaxDuration(n);

        vm.stopPrank();
    }
}
