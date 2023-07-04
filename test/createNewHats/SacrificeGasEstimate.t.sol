// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "test/TestHelper.sol";

// forge test --match-contract SacrificeGasEstimate -vv

/**
 * @dev see note on TestHelper
 */
contract SacrificeGasEstimate is TestHelper {
    uint256 constant cohortSize = 100;

    address[] initiates = new address[](cohortSize);

    function setUp() public override {
        TestHelper.setUp();

        // cohort initiates stake
        generateStakes();

        // fast-forward past half of initiates' deadlines
        vm.warp(8 days);
    }

    /**
     * @dev half cohort stakes, then 2 days later other half stakes
     */
    function generateStakes() public {
        for (uint256 i = 0; i < cohortSize; i++) {
            address randomish = address(uint160(uint256(keccak256(abi.encodePacked(i)))));

            initiates[i] = randomish;
        }

        uint256 breakPoint = cohortSize / 2;

        for (uint256 i = 0; i < breakPoint; i++) {
            stakingAsset.mint(initiates[i], 1000 * 1e18);
            prankJoinInititation(initiates[i]);
        }

        vm.warp(2 days);

        for (uint256 i = breakPoint; i < cohortSize; i++) {
            stakingAsset.mint(initiates[i], 1000 * 1e18);
            prankJoinInititation(initiates[i]);
        }
    }

    /**
     * TESTS
     */

    /**
     * @dev half of initiates should be sacrificed, other half carried over to new cohort
     * in this scenario, no initiates achieved membership / claimed thier stake
     */
    function testSacrificeMore() public {
        vm.startPrank(alice);

        // stakes before
        checkSampleOfStakesBefore();

        // sacrifice those that are eligible
        riteOfMoloch.sacrifice();

        // re-assert values of stakes
        checkSampleOfStakesAfter();

        vm.stopPrank();
    }

    // UTILS
    function checkSampleOfStakesBefore() public {
        uint256 susFee = (riteOfMoloch.minimumStake() / riteOfMoloch.PERC_POINTS()) * sustainabilityFee;

        assertEq(minStake - susFee, riteOfMoloch.checkStake(initiates[0]));
        assertEq(minStake - susFee, riteOfMoloch.checkStake(initiates[(cohortSize / 2) - 1]));
        assertEq(minStake - susFee, riteOfMoloch.checkStake(initiates[cohortSize / 2]));
        assertEq(minStake - susFee, riteOfMoloch.checkStake(initiates[cohortSize - 1]));
    }

    function checkSampleOfStakesAfter() public {
        uint256 susFee = (riteOfMoloch.minimumStake() / riteOfMoloch.PERC_POINTS()) * sustainabilityFee;

        assertEq(0, riteOfMoloch.checkStake(initiates[0]));
        assertEq(0, riteOfMoloch.checkStake(initiates[(cohortSize / 2) - 1]));
        assertEq(minStake - susFee, riteOfMoloch.checkStake(initiates[cohortSize / 2]));
        assertEq(minStake - susFee, riteOfMoloch.checkStake(initiates[cohortSize - 1]));
    }

    function createInitData() public override {
        data.membershipCriteria = dao;
        data.stakingAsset = address(stakingAsset);
        data.daoTreasury = dao;
        data.admin1 = alice;
        data.admin2 = address(0);
        data.cohortSize = 500;
        data.joinDuration = 2 weeks;
        data.threshold = 10;
        data.assetAmount = minStake;
        data.stakeDuration = 1 weeks;
        data.topHatId = 0;
        data.cohortName = "SeasonV";
        data.sbtName = "RiteOfMolochSBT";
        data.sbtSymbol = "SBTMoloch";
        data.baseUri = "x";
        data.shamanOn = false;
    }
}
