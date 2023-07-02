// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "test/TestHelper.sol";

// forge test --match-contract SacrificeSlaugher -vv

/**
 * @dev see note on TestHelper
 */
contract SacrificeSlaugher is TestHelper {
    function setUp() public override {
        TestHelper.setUp();

        // mint tokens to alice & bob
        mintTokens([alice, bob, charlie, deployer]);

        emit log_named_uint("Cohort Counter", ROM.cohortCounter());
        prankJoinInititation(alice);

        vm.warp(2 days);

        emit log_named_uint("Cohort Counter", ROM.cohortCounter());
        prankJoinInititation(bob);

        emit log_named_uint("Cohort Counter", ROM.cohortCounter());
        prankJoinInititation(charlie);
        emit log_named_uint("Cohort Counter", ROM.cohortCounter());
    }

    /**
     * TESTS
     */
    function testSacrfice() public {
        assertEq(1, ROM.cohortSeason());
        emit log_named_uint("Cohort Season", ROM.cohortSeason());
        emit log_named_uint("Join Endtime", ROM.joinEndTime());

        emitUserDeadline("Alice", alice);
        emitUserDeadline("Bob", bob);
        emitUserDeadline("Charlie", charlie);

        vm.warp(8 days);

        vm.startPrank(alice);
        // check current timeStamp
        emit log_named_uint("Timestamp", block.timestamp / DAY_IN_SECONDS);

        // stakes before
        uint256[3] memory userStakesBefore = checkAllUserStakes();
        uint256 fee = (ROM.minimumStake() / ROM.PERC_POINTS()) * sustainabilityFee;

        // assert values of stakes
        for (uint256 i = 0; i < userStakesBefore.length; i++) {
            assertEq(userStakesBefore[i], minStake - fee);
        }

        // slaughter charlie before the sacrifice
        ROM.slaughter(charlie);

        // sacrifice those that are eligible
        ROM.sacrifice();

        // stakes after
        uint256[3] memory userStakesAfter = checkAllUserStakes();

        // re-assert values of stakes
        assertEq(userStakesAfter[0], 0);
        // bob's's time has not expired, so he should not have been sacrificed
        assertEq(userStakesAfter[1], minStake - fee);
        // charlie's's time has not expired, but he was slaughtered before the sacrifice
        assertEq(userStakesAfter[2], 0);

        vm.stopPrank();

        assertEq(2, ROM.cohortSeason());
        assertEq(1, ROM.cohortCounter());
        emit log_named_uint("Cohort Season", ROM.cohortSeason());
        emit log_named_uint("Join Endtime", ROM.joinEndTime());
        emit log_named_uint("Cohort Counter", ROM.cohortCounter());
    }

    // todo: test initiates & cohorst list sizes and carry-over, and reset variables

    // UTILS
    function checkAllUserStakes() public returns (uint256[3] memory) {
        uint256[3] memory stakes = [ROM.checkStake(alice), ROM.checkStake(bob), ROM.checkStake(charlie)];
        emit log_named_uint("Alice   stake", stakes[0]);
        emit log_named_uint("Bob     stake", stakes[1]);
        emit log_named_uint("Charlie stake", stakes[2]);
        return stakes;
    }
}
