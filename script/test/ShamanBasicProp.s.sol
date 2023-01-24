// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "src/InitializationData.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";

// create with verify
// forge script script/test/ShamanBasicProp.s.sol:ShamanBasicPropScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

// create without verify
// forge script script/test/ShamanBasicProp.s.sol:ShamanBasicPropScript --rpc-url $RU --private-key $PK --broadcast -vvvv

interface IBaal {
    function proposalOffering() external returns (uint256);

    function proposalCount() external returns (uint256);

    function submitProposal(
        bytes calldata proposalData,
        uint32 expiration,
        uint256 baalGas,
        string calldata details
    ) external payable returns (uint256);
}

contract ShamanBasicPropScript is Script {
    IBaal public constant baal =
        IBaal(0x6c9110CBbCD400b768646729E5b400F0B5A6BCC7);

    RiteOfMoloch public constant ROM =
        RiteOfMoloch(0x3de5DA236c66b8C6CF3d8B846615144EaBA65Ff9);

    function run() public {
        bytes memory shamanProposal = abi.encodeWithSignature(
            "setShamans(address[],uint256[])",
            [address(ROM)],
            [7]
        );

        uint32 expiration = 0;
        uint256 baalGas = 0;
        string
            memory details = '{"proposalType": "ADD_SHAMAN", "title": "ROM to Shaman", "description": "Demo through a contract"}';

        vm.startBroadcast();
        baal.submitProposal(shamanProposal, expiration, baalGas, details);
        vm.stopBroadcast();
    }
}
