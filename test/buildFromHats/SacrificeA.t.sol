// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "test/TestHelper.sol";

// forge test --match-contract SacrificeA -vv

/**
 * @dev disable callerIsUser on RiteOfMoloch contract for these tests
 */
contract SacrificeA is TestHelper {
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

    /**
     * UTILS
     */
    function createInitData() public override {
        Data.membershipCriteria = dao;
        Data.stakingAsset = address(daoToken);
        Data.treasury = dao;
        Data.topHatWearer = address(0); // todo: add existing topHat address
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
