// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "test/TestHelper.sol";
import "openzeppelin-contracts/token/ERC20/ERC20.sol";

/**
 * @dev see note on TestHelper
 */
contract ClaimStakeTest is TestHelper {
    function setUp() public override {
        TestHelper.setUp();
    }
    /**
     * TESTS
     */

    function testClaimStake(address initiate) public {
        vm.assume(initiate != address(0));

        stakingAsset.mint(initiate, minStake);

        prankJoinInititation(initiate);

        vm.startPrank(initiate, initiate);

        vm.mockCall(dao, abi.encodeWithSelector(IBaal.sharesToken.selector), abi.encode(sharesToken));
        vm.mockCall(
            address(sharesToken), abi.encodeWithSelector(ERC20.balanceOf.selector, initiate), abi.encode(minStake)
        );

        ROM.claimStake();
        vm.stopPrank();

        assertEq(ROM.checkStake(initiate), 0);
        assertEq(ROM.deadlines(initiate), 0);
    }

    function testClaimStakeNoStake(address initiate) public {
        vm.assume(initiate != address(0));

        vm.startPrank(initiate, initiate);

        vm.mockCall(dao, abi.encodeWithSelector(IBaal.sharesToken.selector), abi.encode(sharesToken));
        vm.mockCall(
            address(sharesToken), abi.encodeWithSelector(ERC20.balanceOf.selector, initiate), abi.encode(minStake)
        );

        vm.expectRevert("User has no stake!!");
        ROM.claimStake();

        vm.stopPrank();

        assertEq(ROM.checkStake(initiate), 0);
        assertEq(ROM.deadlines(initiate), 0);
    }

    function testClaimStakeNotAMember(address initiate) public {
        vm.assume(initiate != address(0));

        stakingAsset.mint(initiate, minStake);

        prankJoinInititation(initiate);
        uint256 stake = ROM.checkStake(initiate);
        uint256 deadline = ROM.deadlines(initiate);

        vm.startPrank(initiate, initiate);
        vm.expectRevert("You must be a member!");
        ROM.claimStake();

        assertEq(ROM.checkStake(initiate), stake);
        assertEq(ROM.deadlines(initiate), deadline);

        vm.mockCall(dao, abi.encodeWithSelector(IBaal.sharesToken.selector), abi.encode(sharesToken));
        vm.mockCall(
            address(sharesToken), abi.encodeWithSelector(ERC20.balanceOf.selector, initiate), abi.encode(minStake)
        );

        ROM.claimStake();
        vm.stopPrank();

        assertEq(ROM.checkStake(initiate), 0);
        assertEq(ROM.deadlines(initiate), 0);
    }
}
