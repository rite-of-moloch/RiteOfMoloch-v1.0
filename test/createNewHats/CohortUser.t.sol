// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "test/TestHelper.sol";

// forge test --match-contract CohortUser -vv

/**
 * @dev see note on TestHelper
 */
contract CohortUser is TestHelper {
    function setUp() public override {
        // set and deploy ROM-Factory
        setUpFactory();
        // mint tokens to alice & bob
        mintTokens([alice, bob, charlie, deployer]);
        // set initial data for ROM clone
        createInitData();
        // deploy ROM clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));
    }

    /**
     * TESTS
     */
    function testUserStake() public {
        vm.startPrank(bob);
        stakingAsset.approve(address(ROM), minStake);
        ROM.joinInitiation(bob);
        emit log_named_uint(
            "Bob deadline",
            ROM.getDeadline(bob) / DAY_IN_SECONDS
        );
        ROM.cryForHelp("Help me!");
        vm.stopPrank();
    }

    function testJoinSizeRestriction() public {
        emit log_named_uint("Alice tokenBal", stakingAsset.balanceOf(alice));
        emit log_named_uint("Bob   tokenBal", stakingAsset.balanceOf(bob));

        prankJoinInititation(alice);
        prankJoinInititation(bob);
        prankJoinInititation(deployer);

        vm.startPrank(charlie);
        stakingAsset.approve(address(ROM), minStake);
        // should revert becuase size limit is reached
        vm.expectRevert("This cohort is already full");
        ROM.joinInitiation(charlie);
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
        vm.startPrank(charlie);
        stakingAsset.approve(address(ROM), minStake);
        // should revert becuase time limit is reached
        vm.expectRevert("This cohort is now closed");
        ROM.joinInitiation(charlie);
        vm.stopPrank();
    }
}
