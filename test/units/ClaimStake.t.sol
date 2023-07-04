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

        riteOfMoloch.claimStake();
        vm.stopPrank();

        assertEq(riteOfMoloch.checkStake(initiate), 0);
        assertEq(riteOfMoloch.deadlines(initiate), 0);
    }

    function testClaimStakeNoStake(address initiate) public {
        vm.assume(initiate != address(0));

        vm.startPrank(initiate, initiate);

        vm.mockCall(dao, abi.encodeWithSelector(IBaal.sharesToken.selector), abi.encode(sharesToken));
        vm.mockCall(
            address(sharesToken), abi.encodeWithSelector(ERC20.balanceOf.selector, initiate), abi.encode(minStake)
        );

        vm.expectRevert("User has no stake!!");
        riteOfMoloch.claimStake();

        vm.stopPrank();

        assertEq(riteOfMoloch.checkStake(initiate), 0);
        assertEq(riteOfMoloch.deadlines(initiate), 0);
    }

    function testClaimStakeNotAMember(address initiate) public {
        vm.assume(initiate != address(0));

        stakingAsset.mint(initiate, minStake);

        prankJoinInititation(initiate);
        uint256 stake = riteOfMoloch.checkStake(initiate);
        uint256 deadline = riteOfMoloch.deadlines(initiate);

        vm.startPrank(initiate, initiate);
        vm.expectRevert("You must be a member!");
        riteOfMoloch.claimStake();

        assertEq(riteOfMoloch.checkStake(initiate), stake);
        assertEq(riteOfMoloch.deadlines(initiate), deadline);

        vm.mockCall(dao, abi.encodeWithSelector(IBaal.sharesToken.selector), abi.encode(sharesToken));
        vm.mockCall(
            address(sharesToken), abi.encodeWithSelector(ERC20.balanceOf.selector, initiate), abi.encode(minStake)
        );

        riteOfMoloch.claimStake();
        vm.stopPrank();

        assertEq(riteOfMoloch.checkStake(initiate), 0);
        assertEq(riteOfMoloch.deadlines(initiate), 0);
    }
}
