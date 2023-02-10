// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {IHats} from "hats-protocol/Interfaces/IHats.sol";

// create with verify
// forge script script/ROMFactory.s.sol:ROMFactoryScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

contract ROMFactoryScript is Script {
    // ROM factory contract
    RiteOfMolochFactory public ROMF;

    // Hats interface
    IHats public HATS;

    // Hats protocol implementation
    address public hatsProtocol = 0x96bD657Fcc04c71B47f896a829E5728415cbcAa1;

    // Hats / roles
    uint256 public topHat;
    uint256 public factoryOperatorHat;

    // fake DAO address
    address constant molochDAO = address(1);

    function setUp() public {
        // point to Hats implementation
        HATS = IHats(hatsProtocol);

        // mint topHat
        topHat = HATS.mintTopHat(msg.sender, "ROM-Factory TopHat", "");

        // create factory operator hat
        factoryOperatorHat = HATS.createHat(
            topHat,
            "ROM-Factory Operator",
            1,
            molochDAO,
            molochDAO,
            true,
            ""
        );

        // mint factory operator
        HATS.mintHat(factoryOperatorHat, msg.sender);
    }

    function run() public {
        vm.startBroadcast();

        // change Hats Protocol for chain
        ROMF = new RiteOfMolochFactory(hatsProtocol, factoryOperatorHat);

        vm.stopBroadcast();
    }
}
