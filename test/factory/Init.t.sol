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
        RiteOfMoloch _riteOfMoloch = RiteOfMoloch(romFactory.createCohort(initData, 0));
        initData.shamanOn = false;

        // DAO to onboard to
        assertEq(address(_riteOfMoloch.baal()), address(dao));

        // Cohort
        assertEq(keccak256(abi.encode(_riteOfMoloch.cohortName())), keccak256(abi.encode(initData.cohortName)));
        assertEq(_riteOfMoloch.cohortSeason(), 1);
        assertEq(_riteOfMoloch.cohortCounter(), 0);
        assertEq(_riteOfMoloch.cohortSize(), initData.cohortSize);
        assertEq(_riteOfMoloch.joinDuration(), initData.joinDuration);
        assertEq(_riteOfMoloch.shareThreshold(), initData.shareThreshold);
        assertEq(_riteOfMoloch.stakeDuration(), initData.stakeDuration);

        // Sustainability fees
        assertEq(address(_riteOfMoloch.sustainabilityTreasury()), address(sustainabilityTreasury));
        assertEq(_riteOfMoloch.sustainabilityFee(), sustainabilityFee);

        // Staking asset
        assertEq(address(_riteOfMoloch.stakingAsset()), address(stakingAsset));
        assertEq(_riteOfMoloch.stakingAsset(), initData.stakingAsset);
        assertEq(_riteOfMoloch.minimumStake(), initData.assetAmount);

        // SBT (721)
        assertEq(_riteOfMoloch.name(), initData.sbtName);
        assertEq(_riteOfMoloch.symbol(), initData.sbtSymbol);

        // Hats
        assertEq(address(_riteOfMoloch.hats()), address(hatsProtocol));

        // Tophat will be minted and ID returned
        assertGt(_riteOfMoloch.topHat(), 0);

        // Adminst from InitData will not be set; FALSE: HATS.isWearerOfHat(daoTreasury, initData.topHatId))
        assertEq(address(_riteOfMoloch.admin1()), address(0));
        assertEq(address(_riteOfMoloch.admin2()), address(0));
    }

    function testShamanInit() public {
        // Assume proposal offering is 1 ETH
        vm.mockCall(dao, abi.encodeWithSelector(IBaal.proposalOffering.selector), abi.encode(1 ether));
        vm.mockCall(dao, abi.encodeWithSelector(IBaal.submitProposal.selector), abi.encode(1));

        // Test with shamanOn = true and no Hats magic
        initData.shamanOn = true;
        initData.topHatId = 1;

        vm.expectRevert("Missing tribute");
        romFactory.createCohort(initData, 0);

        // Test with offering provided
        RiteOfMoloch _riteOfMoloch = RiteOfMoloch(romFactory.createCohort{ value: 1 ether }(initData, 0));

        // DAO to onboard to
        assertEq(address(_riteOfMoloch.baal()), address(dao));

        // Cohort
        assertEq(keccak256(abi.encode(_riteOfMoloch.cohortName())), keccak256(abi.encode(initData.cohortName)));
        assertEq(_riteOfMoloch.cohortSeason(), 1);
        assertEq(_riteOfMoloch.cohortCounter(), 0);
        assertEq(_riteOfMoloch.cohortSize(), initData.cohortSize);
        assertEq(_riteOfMoloch.joinDuration(), initData.joinDuration);
        assertEq(_riteOfMoloch.shareThreshold(), initData.shareThreshold);
        assertEq(_riteOfMoloch.stakeDuration(), initData.stakeDuration);

        // Sustainability fees
        assertEq(address(_riteOfMoloch.sustainabilityTreasury()), address(sustainabilityTreasury));
        assertEq(_riteOfMoloch.sustainabilityFee(), sustainabilityFee);

        // Staking asset
        assertEq(address(_riteOfMoloch.stakingAsset()), address(stakingAsset));
        assertEq(_riteOfMoloch.stakingAsset(), initData.stakingAsset);
        assertEq(_riteOfMoloch.minimumStake(), initData.assetAmount);

        // SBT (721)
        assertEq(_riteOfMoloch.name(), initData.sbtName);
        assertEq(_riteOfMoloch.symbol(), initData.sbtSymbol);

        // Hats
        assertEq(address(_riteOfMoloch.hats()), address(hatsProtocol));

        // Tophat will be minted and ID returned
        assertGt(_riteOfMoloch.topHat(), 0);

        // Adminst from InitData will not be set; FALSE: HATS.isWearerOfHat(daoTreasury, initData.topHatId))
        assertEq(address(_riteOfMoloch.admin1()), address(0));
        assertEq(address(_riteOfMoloch.admin2()), address(0));
    }

    function testHatsDoesNotExistInit() public {
        // Hats and factory have a top hat
        assertEq(hatsProtocol.lastTopHatId(), 2);

        // Does not exist so a new one will be created
        initData.topHatId = 1337;

        romFactory.createCohort(initData, 0);
        assertEq(hatsProtocol.lastTopHatId(), 3);

        // Test with offering provided
        RiteOfMoloch _riteOfMoloch = RiteOfMoloch(romFactory.createCohort(initData, 0));

        // DAO to onboard to
        assertEq(address(_riteOfMoloch.baal()), address(dao));

        // Cohort
        assertEq(keccak256(abi.encode(_riteOfMoloch.cohortName())), keccak256(abi.encode(initData.cohortName)));
        assertEq(_riteOfMoloch.cohortSeason(), 1);
        assertEq(_riteOfMoloch.cohortCounter(), 0);
        assertEq(_riteOfMoloch.cohortSize(), initData.cohortSize);
        assertEq(_riteOfMoloch.joinDuration(), initData.joinDuration);
        assertEq(_riteOfMoloch.shareThreshold(), initData.shareThreshold);
        assertEq(_riteOfMoloch.stakeDuration(), initData.stakeDuration);

        // Sustainability fees
        assertEq(address(_riteOfMoloch.sustainabilityTreasury()), address(sustainabilityTreasury));
        assertEq(_riteOfMoloch.sustainabilityFee(), sustainabilityFee);

        // Staking asset
        assertEq(address(_riteOfMoloch.stakingAsset()), address(stakingAsset));
        assertEq(_riteOfMoloch.stakingAsset(), initData.stakingAsset);
        assertEq(_riteOfMoloch.minimumStake(), initData.assetAmount);

        // SBT (721)
        assertEq(_riteOfMoloch.name(), initData.sbtName);
        assertEq(_riteOfMoloch.symbol(), initData.sbtSymbol);

        // Hats
        assertEq(address(_riteOfMoloch.hats()), address(hatsProtocol));

        // Tophat will be minted and ID returned
        assertGt(_riteOfMoloch.topHat(), 0);

        // Adminst from InitData will not be set; FALSE: HATS.isWearerOfHat(daoTreasury, initData.topHatId))
        assertEq(address(_riteOfMoloch.admin1()), address(0));
        assertEq(address(_riteOfMoloch.admin2()), address(0));
    }
}
