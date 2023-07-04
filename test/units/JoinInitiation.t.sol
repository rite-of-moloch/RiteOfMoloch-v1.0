// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "test/TestHelper.sol";

/**
 * @dev see note on TestHelper
 */
contract JoinInitiationTest is TestHelper {
    function setUp() public override {
        TestHelper.setUp();
    }
    /**
     * TESTS
     */

    function testJoinInitiation(address initiate) public {
        vm.assume(initiate != address(0));

        //Happy: Pass on allowance and balance
        stakingAsset.mint(initiate, minStake);

        vm.startPrank(initiate, initiate);
        stakingAsset.approve(address(riteOfMoloch), minStake);
        riteOfMoloch.joinInitiation(initiate);
        vm.stopPrank();

        assertEq(riteOfMoloch.cohortCounter(), 1);
        assertEq(riteOfMoloch.balanceOf(initiate), 1);
    }

    function testJoinInitiationInsuffientAllowance(address initiate) public {
        vm.assume(initiate != address(0));

        stakingAsset.mint(initiate, minStake);

        vm.startPrank(initiate, initiate);
        stakingAsset.approve(address(riteOfMoloch), minStake - 1 ether);
        vm.expectRevert("ERC20: insufficient allowance");
        riteOfMoloch.joinInitiation(initiate);

        vm.stopPrank();

        assertEq(riteOfMoloch.cohortCounter(), 0);
        assertEq(riteOfMoloch.balanceOf(initiate), 0);
    }

    function testJoinInitiationInsuffientBalance(address initiate) public {
        vm.assume(initiate != address(0));

        stakingAsset.mint(initiate, minStake);

        vm.startPrank(initiate, initiate);
        stakingAsset.approve(address(riteOfMoloch), minStake - 1 ether);
        vm.expectRevert("ERC20: insufficient allowance");
        riteOfMoloch.joinInitiation(initiate);

        vm.stopPrank();

        assertEq(riteOfMoloch.cohortCounter(), 0);
        assertEq(riteOfMoloch.balanceOf(initiate), 0);
    }

    function testJoinInitiationCohortClosed(address initiate) public {
        vm.assume(initiate != address(0));

        vm.warp(data.joinDuration + 1 days);

        stakingAsset.mint(initiate, minStake);

        vm.startPrank(initiate, initiate);
        stakingAsset.approve(address(riteOfMoloch), minStake - 1 ether);
        vm.expectRevert("This cohort is now closed");
        riteOfMoloch.joinInitiation(initiate);

        vm.stopPrank();

        assertEq(riteOfMoloch.cohortCounter(), 0);
        assertEq(riteOfMoloch.balanceOf(initiate), 0);
    }

    function testJoinInitiationCohortFull() public {
        for (uint256 i = 0; i < 4; i++) {
            address _address = address(uint160(420 + i));
            stakingAsset.mint(_address, minStake);

            vm.startPrank(_address, _address);
            stakingAsset.approve(address(riteOfMoloch), minStake);
            if (i >= data.cohortSize) {
                vm.expectRevert("This cohort is already full");
            }
            riteOfMoloch.joinInitiation(_address);
            vm.stopPrank();
        }

        assertEq(riteOfMoloch.cohortCounter(), riteOfMoloch.cohortSize());
    }

    function testJoinInitiationAlreadyJoined(address initiate) public {
        vm.assume(initiate != address(0));

        mintTokens(initiate);

        vm.startPrank(initiate, initiate);
        stakingAsset.approve(address(riteOfMoloch), 2 * minStake);
        riteOfMoloch.joinInitiation(initiate);

        vm.expectRevert("Already joined the initiation!");
        riteOfMoloch.joinInitiation(initiate);

        vm.stopPrank();

        assertEq(riteOfMoloch.cohortCounter(), 1);
        assertEq(riteOfMoloch.balanceOf(initiate), 1);
    }

    function testJoinInitiationFeeSplit(uint256 fee) public {
        //TODO handle fee split of 0 or 1e6???
        fee = bound(fee, 1, 1e6 - 1); // 1e6 is PERC_POINTS; between 0.0001% and 99.9999%
        romFactory.updateSustainabilityFee(fee);
        riteOfMoloch = RiteOfMoloch(romFactory.createCohort(data, 1));

        uint256 _sustainabilityFee = (minStake / riteOfMoloch.PERC_POINTS()) * fee;

        uint256 _balanceTreasuryBefore = stakingAsset.balanceOf(sustainabilityTreasury);
        uint256 _balanceRoMBefore = stakingAsset.balanceOf(address(riteOfMoloch));

        mintTokens(alice);

        vm.startPrank(alice, alice);
        stakingAsset.approve(address(riteOfMoloch), 2 * minStake);
        riteOfMoloch.joinInitiation(alice);

        vm.stopPrank();

        uint256 _balanceTreasuryAfter = stakingAsset.balanceOf(sustainabilityTreasury);
        uint256 _balanceRoMAfter = stakingAsset.balanceOf(address(riteOfMoloch));

        assertGt(_balanceTreasuryAfter, _balanceTreasuryBefore);
        assertGt(_balanceRoMAfter, _balanceRoMBefore);
        assertEq(_balanceTreasuryAfter, _sustainabilityFee);
        assertEq(_balanceRoMAfter, minStake - _sustainabilityFee);
    }
}
