// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "test/TestHelper.sol";

// forge test --match-contract CohortUserA -vv

/**
 * @dev disable callerIsUser on RiteOfMoloch contract for these tests
 */
contract CohortUserA is TestHelper {
    function setUp() public {
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
        emit log_named_uint("Bob   tokenBal", daoToken.balanceOf(bob));
        emit log_named_uint("Alice tokenBal", daoToken.balanceOf(alice));

        vm.startPrank(bob);

        daoToken.approve(address(ROM), minStake);

        ROM.joinInitiation(bob);

        emit log_named_uint("Bob deadline", ROM.getDeadline(bob));

        ROM.cryForHelp("Help me!");

        vm.stopPrank();
    }

    /**
     * UTILS
     */
    function createInitData() public override {
        Data.membershipCriteria = dao;
        Data.stakingAsset = address(daoToken);
        Data.treasury = dao;
        Data.admin1 = alice;
        Data.admin2 = address(0);
        Data.cohortSize = 20;
        Data.joinDuration = 21 weeks;
        Data.threshold = 10;
        Data.assetAmount = 10;
        Data.stakeDuration = 52 weeks;
        Data.topHatId = 0; // todo: add existing topHat id
        Data.cohortName = "SeasonV";
        Data.sbtName = "RiteOfMolochSBT";
        Data.sbtSymbol = "SBTMoloch";
        Data.baseUri = "";
    }
}
