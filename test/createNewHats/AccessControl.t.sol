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

    function setUp() public override {
        TestHelper.setUp();
    }

    /**
     * TESTS
     */
    function testAdminPermissions() public {
        changeSettings(deployer, 20);
        changeSettings(alice, 30);
    }

    function testAdminSecurity() public {
        uint256 adminHat = ROM.adminHat();

        // charlie should not be able to call admin functions
        vm.startPrank(charlie);

        vm.expectRevert(
            abi.encodeWithSelector(
                HatsAccessControl.NotWearingRoleHat.selector,
                ADMIN,
                adminHat,
                charlie
            )
        );
        ROM.setMinimumStake(40);

        vm.stopPrank();
    }

    // UTILS
    function changeSettings(address admin, uint256 n) public {
        vm.startPrank(admin);

        ROM.setMinimumStake(n);
        ROM.setShareThreshold(n);
        ROM.setMaxDuration(n);
        emit log_named_uint("Min Share", ROM.minimumShare());
        emit log_named_uint("Min Stake", ROM.minimumStake());
        emit log_named_uint("Max  Time", ROM.maximumTime());

        vm.stopPrank();
    }
}
