// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "test/TestHelper.sol";

// forge test --match-contract CohortUserB -vv

/**
 * @dev disable callerIsUser on RiteOfMoloch contract for these tests
 */
contract CohortUserB is TestHelper {
    function setUp() public {
        // set and deploy ROM-Factory
        setUpFactory();

        // mint tokens to alice & bob
        mintTokens();

        // set initial data for ROM clone
        createInitData();

        // deploy ROM clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));
    }

    /**
     * TESTS
     */
    function testUserStake() public {
        emit log_named_uint("Bob   tokenBal", daoToken.balanceOf(bob));
        emit log_named_uint("Alice tokenBal", daoToken.balanceOf(alice));

        vm.startPrank(bob);

        daoToken.approve(address(ROM), minStake);

        ROM.joinInitiation(bob);

        emit log_named_uint("Bob deadline", ROM.getDeadline(bob));

        ROM.cryForHelp("Help me!");

        vm.stopPrank();
    }

    // todo: test time and size limits
}
