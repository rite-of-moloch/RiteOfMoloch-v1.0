#!/bin/bash

source .env

set -x

forge script script/deploy/deployFactoryAndCohorts.s.sol:DeployFactoryAndCohorts \
--rpc-url $RU --private-key $PK --broadcast --verify
