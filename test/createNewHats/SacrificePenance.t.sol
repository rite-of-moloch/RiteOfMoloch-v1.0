// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "test/TestHelper.sol";

// forge test --match-contract SacrificePenance -vv

/**
 * @dev see note on TestHelper
 */
contract SacrificePenance is TestHelper {
    function setUp() public override {
        TestHelper.setUp();

        // mint tokens to alice & bob
        mintTokens([alice, bob, charlie, deployer]);

        prankJoinInititation(alice);
        prankJoinInititation(bob);
        vm.warp(2 days);
        prankJoinInititation(charlie);
    }

    /**
     * TESTS
     */
    function testSacrifice() public {
        assertEq(1, riteOfMoloch.cohortSeason());
        emit log_named_uint("ROM bal", stakingAsset.balanceOf(address(riteOfMoloch)));
        emit log_named_uint("Admin bal", stakingAsset.balanceOf(sustainabilityTreasury));

        vm.warp(8 days);

        vm.startPrank(alice);
        // check current timeStamp
        emit log_named_uint("Timestamp", block.timestamp / DAY_IN_SECONDS);

        // stakes before
        uint256[3] memory userStakesBefore = checkAllUserStakes();
        uint256 fee = (riteOfMoloch.minimumStake() / riteOfMoloch.PERC_POINTS()) * sustainabilityFee;

        // assert values of stakes
        for (uint256 i = 0; i < userStakesBefore.length; i++) {
            assertEq(
                userStakesBefore[i], // Actual
                minStake - fee // Expected
            );
        }

        // sacrifice those that are eligible
        riteOfMoloch.sacrifice();

        emit log_named_uint("ROM bal", stakingAsset.balanceOf(address(riteOfMoloch)));
        emit log_named_uint("Admin bal", stakingAsset.balanceOf(sustainabilityTreasury));

        // stakes after
        uint256[3] memory userStakesAfter = checkAllUserStakes();

        // re-assert values of stakes
        assertEq(userStakesAfter[0], 0);
        assertEq(userStakesAfter[1], 0);
        // charlie's time has not expired, so he should not have been sacrificed
        assertEq(userStakesAfter[2], minStake - fee);

        vm.stopPrank();

        assertEq(2, riteOfMoloch.cohortSeason());
    }

    // todo: test initiates & cohorst list sizes and carry-over, and reset variables

    // UTILS
    function checkAllUserStakes() public returns (uint256[3] memory) {
        uint256[3] memory stakes =
            [riteOfMoloch.checkStake(alice), riteOfMoloch.checkStake(bob), riteOfMoloch.checkStake(charlie)];
        emit log_named_uint("Alice   stake", stakes[0]);
        emit log_named_uint("Bob     stake", stakes[1]);
        emit log_named_uint("Charlie stake", stakes[2]);
        return stakes;
    }
}

// 10000.000000000000001000
