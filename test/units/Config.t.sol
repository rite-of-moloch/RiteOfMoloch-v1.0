// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "test/TestHelper.sol";
import "openzeppelin-contracts/token/ERC20/ERC20.sol";

import { HatsAccessControl } from "hats-auth/HatsAccessControl.sol";
import { IRiteOfMolochEvents } from "src/interfaces/IROMEvents.sol";

/**
 * @dev see note on TestHelper
 */
contract ConfigTest is TestHelper {
    bytes32 public constant ADMIN = keccak256("ADMIN");

    address admin;
    address _attacker = address(666);

    uint256 adminHat;

    function setUp() public override {
        TestHelper.setUp();
        admin = alice;

        adminHat = riteOfMoloch.adminHat();
    }
    /**
     * TESTS
     */

    function testSetJoinTimeDuration(uint256 duration) public {
        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(HatsAccessControl.NotWearingRoleHat.selector, ADMIN, adminHat, _attacker)
        );
        riteOfMoloch.setJoinTimeDuration(duration);
        vm.stopPrank();

        vm.startPrank(admin);

        vm.expectEmit(false, false, false, true);
        emit UpdatedJoinTimeDuration(data.joinDuration, duration);
        riteOfMoloch.setJoinTimeDuration(duration);

        vm.stopPrank();

        assertEq(riteOfMoloch.joinDuration(), duration);
    }

    function testExtendJoinTimeLimit(uint256 timeLimit) public {
        // Hack to not overflow
        vm.assume(timeLimit < type(uint256).max - riteOfMoloch.joinEndTime());
        uint256 currentLimit = riteOfMoloch.joinEndTime();
        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(HatsAccessControl.NotWearingRoleHat.selector, ADMIN, adminHat, _attacker)
        );
        riteOfMoloch.extendJoinTimeLimit(timeLimit);
        vm.stopPrank();

        vm.startPrank(admin);

        vm.expectEmit(false, false, false, true);
        emit UpdatedJoinTimeLimit(currentLimit, currentLimit + timeLimit);
        riteOfMoloch.extendJoinTimeLimit(timeLimit);

        vm.stopPrank();

        assertEq(riteOfMoloch.joinEndTime(), currentLimit + timeLimit);
    }

    function testSetMaxCohortSize(uint256 sizeLimit) public {
        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(HatsAccessControl.NotWearingRoleHat.selector, ADMIN, adminHat, _attacker)
        );
        riteOfMoloch.setMaxCohortSize(sizeLimit);
        vm.stopPrank();

        vm.startPrank(admin);

        vm.expectEmit(false, false, false, true);
        emit UpdatedMaxCohortSize(data.cohortSize, sizeLimit);
        riteOfMoloch.setMaxCohortSize(sizeLimit);

        vm.stopPrank();

        assertEq(riteOfMoloch.cohortSize(), sizeLimit);
    }

    function testSetMinimumStake(uint256 minimumStake) public {
        vm.assume(minimumStake > 0);

        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(HatsAccessControl.NotWearingRoleHat.selector, ADMIN, adminHat, _attacker)
        );
        riteOfMoloch.setMinimumStake(minimumStake);
        vm.stopPrank();

        vm.startPrank(admin);

        vm.expectRevert("Minimum stake must be greater than zero!");
        riteOfMoloch.setMinimumStake(0);

        vm.expectEmit(false, false, false, true);
        emit UpdatedMinimumStake(data.assetAmount, minimumStake);
        riteOfMoloch.setMinimumStake(minimumStake);

        vm.stopPrank();

        assertEq(riteOfMoloch.minimumStake(), minimumStake);
    }

    function testShareThreshold(uint256 shareThreshold) public {
        vm.assume(shareThreshold > 0);

        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(HatsAccessControl.NotWearingRoleHat.selector, ADMIN, adminHat, _attacker)
        );
        riteOfMoloch.setShareThreshold(shareThreshold);
        vm.stopPrank();

        vm.startPrank(admin);

        vm.expectRevert("Minimum shares must be greater than zero!");
        riteOfMoloch.setShareThreshold(0);

        vm.expectEmit(false, false, false, true);
        emit UpdatedShareThreshold(data.shareThreshold, shareThreshold);
        riteOfMoloch.setShareThreshold(shareThreshold);

        vm.stopPrank();

        assertEq(riteOfMoloch.shareThreshold(), shareThreshold);
    }

    function testSetStakeDuration(uint256 stakeDuration) public {
        vm.assume(stakeDuration > 0);

        vm.startPrank(_attacker);
        vm.expectRevert(
            abi.encodeWithSelector(HatsAccessControl.NotWearingRoleHat.selector, ADMIN, adminHat, _attacker)
        );
        riteOfMoloch.setStakeDuration(stakeDuration);
        vm.stopPrank();

        vm.startPrank(admin);

        vm.expectRevert("Stake duration must be greater than 0!");
        riteOfMoloch.setStakeDuration(0);

        vm.expectEmit(false, false, false, true);
        emit UpdatedStakeDuration(data.stakeDuration, stakeDuration);
        riteOfMoloch.setStakeDuration(stakeDuration);

        vm.stopPrank();

        assertEq(riteOfMoloch.stakeDuration(), stakeDuration);
    }
}
