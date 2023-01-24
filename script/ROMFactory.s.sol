// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {IHats} from "src/hats/IHats.sol";

// create with verify
// forge script script/ROMFactory.s.sol:ROMFactoryScript --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

// create without verify
// forge script script/ROMFactory.s.sol:ROMFactoryScript --rpc-url $RU --private-key $PK --broadcast -vvvv

contract ROMFactoryScript is Script {
    // ROM factory contract
    RiteOfMolochFactory public ROMF;

    // Hats interface
    IHats public HATS;

    // Hats protocol implementation
    address public hatsProtocolGoerli =
        0xcf912a0193593f5cD55D81FF611c26c3ED63f924;
    address public hatsProtocolPolygon =
        0x95647F88dcbC12986046fc4f49064Edd11a25d38;
    address public hatsProtocolGnosis =
        0x6B49b86D21aBc1D60611bD85c843a9766B5493DB;

    // Hats / roles
    uint256 public topHat;
    uint256 public factoryOperatorHat;

    // fake DAO address
    address constant molochDAO = address(1);

    function setUp() public {
        // point to Hats implementation
        HATS = IHats(hatsProtocolGoerli);

        // mint topHat
        topHat = HATS.mintTopHat(address(this), "ROM-Factory TopHat", "");

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
        ROMF = new RiteOfMolochFactory(hatsProtocolGoerli, factoryOperatorHat);

        vm.stopBroadcast();
    }
}
