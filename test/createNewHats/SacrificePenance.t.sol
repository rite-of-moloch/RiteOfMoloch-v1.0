// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "test/TestHelper.sol";

// forge test --match-contract SacrificePenance -vv

/**
 * @dev see note on TestHelper
 */
contract SacrificePenance is TestHelper {
    function setUp() public override {
        // set and deploy ROM-Factory
        setUpFactory();
        // mint tokens to alice & bob
        mintTokens([alice, bob, charlie, deployer]);
        // set initial data for ROM clone
        createInitData();
        // deploy ROM clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        prankJoinInititation(alice);
        prankJoinInititation(bob);
        vm.warp(2 days);
        prankJoinInititation(charlie);
    }

    /**
     * TESTS
     */
    function testSacrfice() public {
        assertEq(1, ROM.cohortSeason());
        emit log_named_uint("ROM bal", stakingAsset.balanceOf(address(ROM)));
        emit log_named_uint("Admin bal", stakingAsset.balanceOf(adminTreasury));

        vm.warp(8 days);

        vm.startPrank(alice);
        // check current timeStamp
        emit log_named_uint("Timestamp", block.timestamp / DAY_IN_SECONDS);

        // stakes before
        uint256[3] memory userStakesBefore = checkAllUserStakes();

        // assert values of stakes
        for (uint256 i = 0; i < userStakesBefore.length; i++) {
            assertEq(
                userStakesBefore[i], // Actual
                minStake - ((adminFee * minStake) / 100) // Expected
            );
        }

        // sacrifice those that are eligible
        ROM.sacrifice();

        emit log_named_uint("ROM bal", stakingAsset.balanceOf(address(ROM)));
        emit log_named_uint("Admin bal", stakingAsset.balanceOf(adminTreasury));

        // stakes after
        uint256[3] memory userStakesAfter = checkAllUserStakes();

        // re-assert values of stakes
        assertEq(userStakesAfter[0], 0);
        assertEq(userStakesAfter[1], 0);
        // charlie's time has not expired, so he should not have been sacrificed
        assertEq(userStakesAfter[2], minStake - ((adminFee * minStake) / 100));

        vm.stopPrank();

        assertEq(2, ROM.cohortSeason());
    }

    // todo: test initiates & cohorst list sizes and carry-over, and reset variables

    // UTILS
    function checkAllUserStakes() public returns (uint256[3] memory) {
        uint256[3] memory stakes = [
            ROM.checkStake(alice),
            ROM.checkStake(bob),
            ROM.checkStake(charlie)
        ];
        emit log_named_uint("Alice   stake", stakes[0]);
        emit log_named_uint("Bob     stake", stakes[1]);
        emit log_named_uint("Charlie stake", stakes[2]);
        return stakes;
    }
}

// 10000.000000000000001000
