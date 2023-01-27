// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IBaal {
    function proposalOffering() external returns (uint256);

    function proposalCount() external returns (uint256);

    function submitProposal(
        bytes calldata proposalData,
        uint32 expiration,
        uint256 baalGas,
        string calldata details
    ) external payable returns (uint256);

    function sharesToken() external returns (address);
}
