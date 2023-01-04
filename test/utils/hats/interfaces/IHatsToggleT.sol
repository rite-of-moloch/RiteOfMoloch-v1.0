// SPDX-License-Identifier: GNU
pragma solidity >=0.8.13;

interface IHatsToggleT {
    function getHatStatus(uint256 _hatId) external view returns (bool);
}
