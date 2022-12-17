// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "test/TestHelper.t.sol";

// forge test --match-contract ROMTest -vv

contract ROMTest is TestHelper {
	bytes32 public constant ADMIN = keccak256("ADMIN");
  bytes32 public constant OPERATOR = keccak256("OPERATOR");
  bytes32 public constant DEFAULT_ADMIN_ROLE = keccak256("DEFAULT_ADMIN_ROLE");
	
	function testAdminOperatorRoles() public {
		bool roleAdmin = ROM.hasRole(ADMIN, address(ROMF));
		bool roleOperator = ROM.hasRole(OPERATOR, address(ROMF));

		assertTrue(roleAdmin);
		assertTrue(roleOperator);
	}
}

