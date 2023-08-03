// SPDX-License-Identifier: MIT
// @author huntrr / Raid Guild
pragma solidity ^0.8.13;

import { IBaal } from "src/baal/IBaal.sol";

import { IRiteOfMolochAdmin } from "src/interfaces/IROMAdmin.sol";
import { IRiteOfMolochUser } from "src/interfaces/IROMUser.sol";
import { IRiteOfMolochEvents } from "src/interfaces/IROMEvents.sol";

interface IRiteOfMoloch is IRiteOfMolochEvents, IRiteOfMolochAdmin, IRiteOfMolochUser { }
