// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {RiteOfMolochFactory} from "src/RiteOfMolochFactory.sol";
import {DeployHelper} from "script/deploy/helpers.sol";


// forge script script/deploy/deployFactoryAndCohorts.s.sol:DeployFactoryAndCohorts --fork-url <URL> --broadcast
// forge script script/deploy/deployFactoryAndCohorts.s.sol:DeployFactoryAndCohorts --rpc-url $RU --private-key $PK --broadcast --verify --etherscan-api-key $EK -vvvv

/// @notice deploys a mock ROMFactory on it's own to Goerli
contract DeployFactoryAndCohorts is Script, DeployHelper {


    function run() public {
        vm.startBroadcast(vm.envUint("PK"));

        _deployFactory();
        _deployCohorts();

        vm.stopBroadcast();
    }

}
