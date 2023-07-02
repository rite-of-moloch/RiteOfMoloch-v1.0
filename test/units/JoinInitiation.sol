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
        stakingAsset.mint(initiate, minStake - 1 ether);

        vm.startPrank(initiate, initiate);
        stakingAsset.approve(address(ROM), minStake - 1 ether);

        // TODO Does not revert?
        vm.expectRevert("Insufficient balance");
        ROM.joinInitiation(initiate);
        vm.stopPrank();

        mintTokens(initiate);

        vm.startPrank(initiate, initiate);
        stakingAsset.approve(address(ROM), minStake);
        ROM.joinInitiation(initiate);
        vm.stopPrank();
    }
}
