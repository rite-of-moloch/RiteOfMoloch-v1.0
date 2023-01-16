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
        emit log_named_uint(
            "Alice deadline",
            ROM.getDeadline(alice) / DAY_IN_SECONDS
        );

        emit log_named_uint(
            "Bob deadline",
            ROM.getDeadline(bob) / DAY_IN_SECONDS
        );

        emit log_named_uint(
            "Charlie deadline",
            ROM.getDeadline(charlie) / DAY_IN_SECONDS
        );

        vm.warp(8 days);

        vm.startPrank(alice);
        // check current timeStamp
        emit log_named_uint("Timestamp", block.timestamp / DAY_IN_SECONDS);

        // stakes before
        uint256 aliceStake = ROM.checkStake(alice);
        uint256 bobStake = ROM.checkStake(bob);
        uint256 charlieStake = ROM.checkStake(charlie);

        // log stakes
        emit log_named_uint("Alice stake", aliceStake);
        emit log_named_uint("Bob stake", bobStake);

        // assert value of stakes
        assertEq(aliceStake, minStake);
        assertEq(bobStake, minStake);
        assertEq(charlieStake, minStake);

        // sacrifice those that are eligible
        ROM.sacrifice(failedInitiates);

        // stakes after
        uint256 aliceSacrificedStake = ROM.checkStake(alice);
        uint256 bobSacrificedStake = ROM.checkStake(bob);
        uint256 charlieSacrificedStake = ROM.checkStake(charlie);

        emit log_named_uint("Alice stake", aliceSacrificedStake);
        emit log_named_uint("Bob stake", bobSacrificedStake);
        emit log_named_uint("Charlie stake", charlieSacrificedStake);

        assertEq(aliceSacrificedStake, 0);
        assertEq(bobSacrificedStake, 0);
        // charlie's time has not expired, so he should not have been sacrificed
        assertEq(charlieSacrificedStake, minStake);

        vm.stopPrank();
    }
}
