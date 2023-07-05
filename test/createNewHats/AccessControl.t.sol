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
        address _deployer = deployer;
        address _admin = admin;

        vm.assume(deployerValue > 0);
        vm.assume(adminValue > 0);

        // Deployer wears the admin hat
        changeSettings(_deployer, deployerValue);

        assertEq(riteOfMoloch.minimumStake(), deployerValue);
        assertEq(riteOfMoloch.shareThreshold(), deployerValue);
        assertEq(riteOfMoloch.stakeDuration(), deployerValue);

        // Admin wears the admin hat
        changeSettings(_admin, adminValue);

        assertEq(riteOfMoloch.minimumStake(), adminValue);
        assertEq(riteOfMoloch.shareThreshold(), adminValue);
        assertEq(riteOfMoloch.stakeDuration(), adminValue);
    }

    function testAdminSecurityFuzz(address _attacker) public {
        vm.assume(_attacker != deployer);
        vm.assume(_attacker != admin);

        uint256 adminHat = riteOfMoloch.adminHat();

        // charlie should not be able to call admin functions
        vm.startPrank(_attacker);

        vm.expectRevert(
            abi.encodeWithSelector(HatsAccessControl.NotWearingRoleHat.selector, ADMIN, adminHat, _attacker)
        );
        riteOfMoloch.setMinimumStake(40);
        assertEq(riteOfMoloch.minimumStake(), minStake);

        vm.stopPrank();
    }

    // UTILS
    function changeSettings(address _admin, uint256 n) public {
        vm.startPrank(_admin);

        riteOfMoloch.setMinimumStake(n);
        riteOfMoloch.setShareThreshold(n);
        riteOfMoloch.setStakeDuration(n);

        vm.stopPrank();
    }
}
