// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "src/InitializationData.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {RiteOfMoloch} from "src/RiteOfMoloch.sol";
import {IHats} from "src/hats/IHats.sol";
import {ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

// create with verify
// forge script script/test/BaalV3.s.sol:BaalV3Script --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

// create without verify
// forge script script/test/BaalV3.s.sol:BaalV3Script --rpc-url $RU --private-key $PK --broadcast -vvvv

interface Baal {
    /** USER FUNCTION */
    function submitProposal(
        bytes calldata proposalData,
        uint32 expiration,
        uint256 baalGas,
        string calldata details
    ) external payable returns (uint256);

    /** MEMBER FUNCTIONS */
    function sponsorProposal(uint32 id) external;

    function submitVote(uint32 id, bool approved) external;

    function processProposal(uint32 id, bytes calldata proposalData) external;

    function cancelProposal(uint32 id) external;

    function ragequit(
        address to,
        uint256 sharesToBurn,
        uint256 lootToBurn,
        address[] calldata tokens
    ) external;

    /** DAO MGMT FUNCTION */
    function setShamans(
        address[] calldata _shamans,
        uint256[] calldata _permissions
    ) external;
}

contract BaalV3Script is Script {
    Baal public constant baal =
        Baal(0x6c9110CBbCD400b768646729E5b400F0B5A6BCC7);

    RiteOfMoloch public constant ROM =
        RiteOfMoloch(0x3de5DA236c66b8C6CF3d8B846615144EaBA65Ff9);

    function run() public {
        address[] memory recipients = new address[](1);
        recipients[0] = address(ROM);

        uint256[] memory shamanLevel = new uint256[](1);
        shamanLevel[0] = 7;

        bytes memory shamanProposal = abi.encodeWithSignature(
            "setShamans(address[],uint256[])",
            recipients,
            shamanLevel
        );

        bytes memory multiSend = abi.encodePacked(
            uint8(0), // 0, 1 delegate call
            address(baal), // target
            uint256(0), // paading
            uint256(shamanProposal.length), // length
            bytes(shamanProposal) // encoded action
        );

        bytes memory multiSendAction = abi.encodeWithSignature(
            "multiSend(bytes)",
            multiSend
        );

        uint32 expiration = 0;
        uint256 baalGas = 21000;
        string memory details = "ROM to Shaman";

        baal.submitProposal(multiSendAction, expiration, baalGas, details);
    }
}
