// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "test/TestHelper.sol";
import "openzeppelin-contracts/token/ERC20/ERC20.sol";

/**
 * @dev see note on TestHelper
 */
contract IsMemberTest is TestHelper {
    function setUp() public override {
        TestHelper.setUp();
    }
    /**
     * TESTS
     */

    function testIsMember(address initiate) public {
        assumePayable(initiate);
        vm.assume(
            initiate != address(0) || initiate != address(riteOfMoloch) || initiate != address(this)
                || initiate != address(sharesToken) || initiate != address(dao)
        );

        assertFalse(riteOfMoloch.isMember(initiate));
        vm.mockCall(dao, abi.encodeWithSelector(IBaal.sharesToken.selector), abi.encode(sharesToken));
        vm.mockCall(
            address(sharesToken), abi.encodeWithSelector(ERC20.balanceOf.selector, initiate), abi.encode(minStake)
        );

        assertTrue(riteOfMoloch.isMember(initiate));

        vm.clearMockedCalls();
    }
}
