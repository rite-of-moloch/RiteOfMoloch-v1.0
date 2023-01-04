// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {TestHelperA} from "test/buildFromHats/TestHelperA.t.sol";

// forge test --match-contract AccessControlA -vv

contract AccessControlA is TestHelperA {
    bytes32 public constant SUPER_ADMIN = keccak256("SUPER_ADMIN");
    bytes32 public constant ADMIN = keccak256("ADMIN");

    // function testSuperAdmin() public {
    //     vm.startPrank(deployer);
    //     ROM.setMinimumStake(20);
    //     ROM.setShareThreshold(30);
    //     ROM.setMaxDuration(40);
    //     emit log_named_uint("Min     Share", ROM.minimumShare());
    //     emit log_named_uint("Min     Stake", ROM.minimumStake());
    //     emit log_named_uint("Max      Time", ROM.maximumTime());
    //     vm.stopPrank();
    // }

    // function testSetAdmin() public {
    //     vm.startPrank(deployer);
    //     hats.mintHat(ROM.adminHat(), alice);
    //     assertTrue(ROM.hasRole(ADMIN, alice));
    //     vm.stopPrank();
    // }
}
