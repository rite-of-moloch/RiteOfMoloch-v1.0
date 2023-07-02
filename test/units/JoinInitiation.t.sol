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
        stakingAsset.approve(address(ROM), minStake);
        ROM.joinInitiation(initiate);
        vm.stopPrank();

        assertEq(ROM.cohortCounter(), 1);
        assertEq(ROM.balanceOf(initiate), 1);
    }

    function testJoinInitiationInsuffientAllowance(address initiate) public {
        vm.assume(initiate != address(0));

        stakingAsset.mint(initiate, minStake);

        vm.startPrank(initiate, initiate);
        stakingAsset.approve(address(ROM), minStake - 1 ether);
        vm.expectRevert("ERC20: insufficient allowance");
        ROM.joinInitiation(initiate);

        vm.stopPrank();

        assertEq(ROM.cohortCounter(), 0);
        assertEq(ROM.balanceOf(initiate), 0);
    }

    function testJoinInitiationInsuffientBalance(address initiate) public {
        vm.assume(initiate != address(0));

        stakingAsset.mint(initiate, minStake);

        vm.startPrank(initiate, initiate);
        stakingAsset.approve(address(ROM), minStake - 1 ether);
        vm.expectRevert("ERC20: insufficient allowance");
        ROM.joinInitiation(initiate);

        vm.stopPrank();

        assertEq(ROM.cohortCounter(), 0);
        assertEq(ROM.balanceOf(initiate), 0);
    }

    function testJoinInitiationCohortClosed(address initiate) public {
        vm.assume(initiate != address(0));

        vm.warp(Data.joinDuration + 1 days);

        stakingAsset.mint(initiate, minStake);

        vm.startPrank(initiate, initiate);
        stakingAsset.approve(address(ROM), minStake - 1 ether);
        vm.expectRevert("This cohort is now closed");
        ROM.joinInitiation(initiate);

        vm.stopPrank();

        assertEq(ROM.cohortCounter(), 0);
        assertEq(ROM.balanceOf(initiate), 0);
    }

    function testJoinInitiationCohortFull() public {
        for (uint256 i = 0; i < 4; i++) {
            address _address = address(uint160(420 + i));
            stakingAsset.mint(_address, minStake);

            vm.startPrank(_address, _address);
            stakingAsset.approve(address(ROM), minStake);
            if (i >= Data.cohortSize) {
                vm.expectRevert("This cohort is already full");
            }
            ROM.joinInitiation(_address);
            vm.stopPrank();
        }

        assertEq(ROM.cohortCounter(), ROM.cohortSize());
    }

    function testJoinInitiationAlreadyJoined(address initiate) public {
        vm.assume(initiate != address(0));

        mintTokens(initiate);

        vm.startPrank(initiate, initiate);
        stakingAsset.approve(address(ROM), 2 * minStake);
        ROM.joinInitiation(initiate);

        vm.expectRevert("Already joined the initiation!");
        ROM.joinInitiation(initiate);

        vm.stopPrank();

        assertEq(ROM.cohortCounter(), 1);
        assertEq(ROM.balanceOf(initiate), 1);
    }

    function testJoinInitiationFeeSplit(uint256 fee) public {
        //TODO handle fee split of 0 or 1e6???
        fee = bound(fee, 1, 1e6 - 1); // 1e6 is PERC_POINTS; between 0.0001% and 99.9999%
        ROMF.updateSustainabilityFee(fee);
        ROM = RiteOfMoloch(ROMF.createCohort(Data, 1));

        uint256 _sustainabilityFee = (minStake / ROM.PERC_POINTS()) * fee;

        uint256 _balanceTreasuryBefore = stakingAsset.balanceOf(sustainabilityTreasury);
        uint256 _balanceRoMBefore = stakingAsset.balanceOf(address(ROM));

        mintTokens(alice);

        vm.startPrank(alice, alice);
        stakingAsset.approve(address(ROM), 2 * minStake);
        ROM.joinInitiation(alice);

        vm.stopPrank();

        uint256 _balanceTreasuryAfter = stakingAsset.balanceOf(sustainabilityTreasury);
        uint256 _balanceRoMAfter = stakingAsset.balanceOf(address(ROM));

        assertGt(_balanceTreasuryAfter, _balanceTreasuryBefore);
        assertGt(_balanceRoMAfter, _balanceRoMBefore);
        assertEq(_balanceTreasuryAfter, _sustainabilityFee);
        assertEq(_balanceRoMAfter, minStake - _sustainabilityFee);
    }
}
