// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "src/InitializationData.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";

// create with verify
// forge script script/test/ShamanMultiProp.s.sol:ShamanMultiPropScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

// create without verify
// forge script script/test/ShamanMultiProp.s.sol:ShamanMultiPropScript --rpc-url $RU --private-key $PK --broadcast -vvvv

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

contract ShamanMultiPropScript is Script {
    IBaal public constant baal =
        IBaal(0x6053dE194226843E4FD99A82C1386B4C76E19E34);

    address public constant ROM = 0x3de5DA236c66b8C6CF3d8B846615144EaBA65Ff9;

    address public constant addr1 = 0x0000000000000000000000000000000000000111;

    address public constant addr2 = 0x0000000000000000000000000000000000000222;

    function encodeShamanProposal(address shaman, uint256 permission)
        public
        pure
        returns (bytes memory)
    {
        address[] memory _shaman = new address[](1);
        _shaman[0] = shaman;

        uint256[] memory _permission = new uint256[](1);
        _permission[0] = permission;

        return
            abi.encodeWithSignature(
                "setShamans(address[],uint256[])",
                _shaman,
                _permission
            );
    }

    function encodeMetaTx(bytes[2] memory _data)
        public
        pure
        returns (bytes memory)
    {
        bytes memory metaTx;

        for (uint256 i = 0; i < _data.length; i++) {
            metaTx = abi.encodePacked(
                metaTx,
                uint8(0), // 0 , 1 delegate call
                address(baal), // target
                uint256(0), // value
                uint256(_data[i].length), // bytes length
                _data[i] // encoded action
            );
        }

        return abi.encodeWithSignature("multiSend(bytes)", metaTx);
    }

    function run() public payable {
        uint32 expiration = 0;
        uint256 baalGas = 0;

        bytes memory data1 = encodeShamanProposal(addr1, 1);

        bytes memory data2 = encodeShamanProposal(addr2, 2);

        bytes memory multisendMetaTx = encodeMetaTx([data1, data2]);

        uint256 proposalOffering = baal.proposalOffering();
        // This check assumes the contract does not have any shares to bypass tribute fee
        // otherwise you shuld also check sharesToken.getVotes(address(this)) >= baal.sponsorThreshold()
        require(msg.value == proposalOffering, "Missing tribute");
        string
            memory details = '{"proposalType": "ADD_SHAMAN", "title": "ROM to Shaman", "description": "Demo through a contract"}';

        vm.startBroadcast();

        baal.submitProposal{value: proposalOffering}(
            multisendMetaTx,
            expiration,
            baalGas,
            details
        );

        vm.stopBroadcast();
    }
}
