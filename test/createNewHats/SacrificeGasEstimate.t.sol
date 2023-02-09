// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "test/TestHelper.sol";

// forge test --match-contract SacrificeGasEstimate -vvvv

/**
 * @dev see note on TestHelper
 */
contract SacrificeGasEstimate is TestHelper {
    uint256 constant cohortSize = 100;

    address[] initiates = new address[](cohortSize);

    function setUp() public override {
        // set and deploy ROM-Factory
        setUpFactory();

        // set initial data for ROM clone
        createInitData();

        // deploy ROM clone
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

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
            address randomish = address(
                uint160(uint256(keccak256(abi.encodePacked(i))))
            );

            initiates[i] = randomish;
        }

        uint256 breakPoint = cohortSize / 2;

        for (uint256 i = 0; i < breakPoint; i++) {
            stakingAsset.mint(initiates[i], 1000);
            prankJoinInititation(initiates[i]);
        }

        vm.warp(2 days);

        for (uint256 i = breakPoint; i < cohortSize; i++) {
            stakingAsset.mint(initiates[i], 1000);
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
    function testSacrficeMore() public {
        vm.startPrank(alice);

        // stakes before
        checkSampleOfStakesBefore();

        // sacrifice those that are eligible
        ROM.sacrifice();

        // re-assert values of stakes
        checkSampleOfStakesAfter();

        vm.stopPrank();
    }

    // UTILS
    function checkSampleOfStakesBefore() public {
        assertEq(minStake, ROM.checkStake(initiates[0]));
        assertEq(minStake, ROM.checkStake(initiates[(cohortSize / 2) - 1]));
        assertEq(minStake, ROM.checkStake(initiates[cohortSize / 2]));
        assertEq(minStake, ROM.checkStake(initiates[cohortSize - 1]));
    }

    function checkSampleOfStakesAfter() public {
        assertEq(0, ROM.checkStake(initiates[0]));
        assertEq(0, ROM.checkStake(initiates[(cohortSize / 2) - 1]));
        assertEq(minStake, ROM.checkStake(initiates[cohortSize / 2]));
        assertEq(minStake, ROM.checkStake(initiates[cohortSize - 1]));
    }

    function createInitData() public override {
        Data.membershipCriteria = dao;
        Data.stakingAsset = address(stakingAsset);
        Data.treasury = dao;
        Data.admin1 = alice;
        Data.admin2 = address(0);
        Data.cohortSize = 500;
        Data.joinDuration = 2 weeks;
        Data.threshold = 10;
        Data.assetAmount = minStake;
        Data.stakeDuration = 1 weeks;
        Data.topHatId = 0;
        Data.cohortName = "SeasonV";
        Data.sbtName = "RiteOfMolochSBT";
        Data.sbtSymbol = "SBTMoloch";
        Data.baseUri = "x";
        Data.shamanOn = false;
    }
}
