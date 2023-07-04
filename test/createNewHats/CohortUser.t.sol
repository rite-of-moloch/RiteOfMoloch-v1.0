// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "test/TestHelper.sol";

// forge test --match-contract CohortUser -vv

/**
 * @dev see note on TestHelper
 */
contract CohortUser is TestHelper {
    function setUp() public override {
        TestHelper.setUp();

        // mint tokens to alice & bob
        mintTokens([alice, bob, charlie, deployer]);
    }

    /**
     * TESTS
     */
    function testUserStake() public {
        vm.startPrank(bob, bob);
        stakingAsset.approve(address(riteOfMoloch), minStake);
        riteOfMoloch.joinInitiation(bob);
        emit log_named_uint("Bob deadline", riteOfMoloch.getDeadline(bob) / DAY_IN_SECONDS);
        riteOfMoloch.cryForHelp("Help me!");
        vm.stopPrank();
    }

    function testJoinSizeRestriction() public {
        emit log_named_uint("Alice tokenBal", stakingAsset.balanceOf(alice));
        emit log_named_uint("Bob   tokenBal", stakingAsset.balanceOf(bob));

        prankJoinInititation(alice);
        prankJoinInititation(bob);
        prankJoinInititation(deployer);

        vm.startPrank(charlie, charlie);
        stakingAsset.approve(address(riteOfMoloch), minStake);
        // should revert becuase size limit is reached
        vm.expectRevert("This cohort is already full");
        riteOfMoloch.joinInitiation(charlie);
        vm.stopPrank();

        emit log_named_uint("Alice tokenBal", stakingAsset.balanceOf(alice));
        emit log_named_uint("Bob   tokenBal", stakingAsset.balanceOf(bob));
    }

    function testJoinTimeRestriction() public {
        vm.warp(7 days);
        prankJoinInititation(alice);

        vm.warp(13 days);
        prankJoinInititation(bob);

        vm.warp(15 days);
        vm.startPrank(charlie, charlie);
        stakingAsset.approve(address(riteOfMoloch), minStake);
        // should revert becuase time limit is reached
        vm.expectRevert("This cohort is now closed");
        riteOfMoloch.joinInitiation(charlie);
        vm.stopPrank();
    }
}
