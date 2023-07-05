// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "test/TestHelper.sol";
import "openzeppelin-contracts/token/ERC20/ERC20.sol";

/**
 * @dev see note on TestHelper
 */
contract ClaimStakeTest is TestHelper {
    event Feedback(address user, address treasury, string feedback);

    function setUp() public override {
        TestHelper.setUp();
    }
    /**
     * TESTS
     */

    function testCryForHelp(address initiate) public {
        vm.assume(initiate != address(0));

        vm.expectRevert("Only cohort participants!");
        riteOfMoloch.cryForHelp("HELP!");

        stakingAsset.mint(initiate, minStake);

        prankJoinInititation(initiate);

        vm.startPrank(initiate, initiate);

        vm.expectEmit(false, false, false, false);
        // We emit the event we expect to see.
        emit Feedback(initiate, sustainabilityTreasury, "HELP!");
        riteOfMoloch.cryForHelp("HELP!");

        vm.stopPrank();
    }
}
