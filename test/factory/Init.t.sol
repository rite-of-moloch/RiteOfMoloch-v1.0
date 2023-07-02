// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "test/TestHelper.sol";
import "openzeppelin-contracts/token/ERC20/ERC20.sol";

/**
 * @dev see note on TestHelper
 */
contract InitTest is TestHelper {
    InitData initData;

    function setUp() public override {
        TestHelper.setUp();
        initData = data;
    }
    /**
     * TESTS
     */

    // InitData calldata initData,
    // address hatsProtocol,
    // address caller_,
    // address _sustainabilityTreasury,
    // uint256 _sustainabilityFee

    // address membershipCriteria;
    // address stakingAsset;
    // address daoTreasury;
    // address admin1;
    // address admin2;
    // uint256 cohortSize;
    // uint256 joinDuration;
    // uint256 threshold;
    // uint256 assetAmount;
    // uint256 stakeDuration;
    // uint256 topHatId;
    // string cohortName;
    // string sbtName;
    // string sbtSymbol;
    // string baseUri;
    // bool shamanOn;
    function testBasicInit() public {
        RiteOfMoloch ROM = RiteOfMoloch(ROMF.createCohort(initData, 1));
        initData.shamanOn = false;

        // DAO to onboard to
        assertEq(address(ROM.baal()), address(dao));

        // Cohort
        assertEq(keccak256(abi.encode(ROM.cohortName())), keccak256(abi.encode(initData.cohortName)));
        assertEq(ROM.cohortSeason(), 1);
        assertEq(ROM.cohortCounter(), 0);
        assertEq(ROM.cohortSize(), initData.cohortSize);
        assertEq(ROM.joinDuration(), initData.joinDuration);
        assertEq(ROM.minimumShare(), initData.threshold);
        assertEq(ROM.maximumTime(), initData.stakeDuration);

        // Sustainability fees
        assertEq(address(ROM.sustainabilityTreasury()), address(sustainabilityTreasury));
        assertEq(ROM.sustainabilityFee(), sustainabilityFee);

        // Staking asset
        assertEq(address(ROM.stakingAsset()), address(stakingAsset));
        assertEq(ROM.stakingAsset(), initData.stakingAsset);
        assertEq(ROM.minimumStake(), initData.assetAmount);

        // SBT (721)
        assertEq(ROM.name(), initData.sbtName);
        assertEq(ROM.symbol(), initData.sbtSymbol);

        // Hats
        assertEq(address(ROM.HATS()), address(HATS));

        // Tophat will be minted and ID returned
        assertGt(ROM.topHat(), 0);

        // Adminst from InitData will not be set; FALSE: HATS.isWearerOfHat(daoTreasury, initData.topHatId))
        assertEq(address(ROM.admin1()), address(0));
        assertEq(address(ROM.admin2()), address(0));
    }
}
