// SPDX-License-Identifier: GNU
pragma solidity >=0.8.13;

interface HatsErrorsT {
    error NotAdmin(address _user, uint256 _hatId);
    error AllHatsWorn(uint256 _hatId);
    error AlreadyWearingHat(address _wearer, uint256 _hatId);
    error HatDoesNotExist(uint256 _hatId);
    error NotEligible(address _wearer, uint256 _hatId);
    error NotHatWearer();
    error NotHatsToggle();
    error NotHatsEligibility();
    error BatchArrayLengthMismatch();
    error MaxLevelsReached();
    error Immutable();
    error NewMaxSupplyTooLow();

    error NotWearingRoleHat(bytes32 role, uint256 hat, address account);
}
