// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "test/TestHelper.sol";

// forge test --match-contract SacrificeB -vv

/**
 * @dev disable callerIsUser on RiteOfMoloch contract for these tests
 */
contract SacrificeB is TestHelper {
    address[] failedInitiates = [alice, bob, charlie];

    function setUp() public {
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
        emitUserDeadline("Alice", alice);
        emitUserDeadline("Bob", bob);
        emitUserDeadline("Charlie", charlie);

        vm.warp(8 days);
        vm.startPrank(alice);
        // check current timeStamp
        emit log_named_uint("Timestamp", block.timestamp / DAY_IN_SECONDS);

        // stakes before
        uint256[3] memory userStakesBefore = checkAllUserStakes();

        // assert values of stakes
        for (uint256 i = 0; i < userStakesBefore.length; i++) {
            assertEq(userStakesBefore[i], minStake);
        }

        // sacrifice those that are eligible
        ROM.sacrifice(failedInitiates);

        // stakes after
        uint256[3] memory userStakesAfter = checkAllUserStakes();

        // re-assert values of stakes
        assertEq(userStakesAfter[0], 0);
        assertEq(userStakesAfter[1], 0);
        // charlie's time has not expired, so he should not have been sacrificed
        assertEq(userStakesAfter[2], minStake);

        vm.stopPrank();
    }

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
