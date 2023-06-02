// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IInitData} from "src/interfaces/IInitData.sol";

/*
0	initData.membershipCriteria	address	0x6053dE194226843E4FD99A82C1386B4C76E19E34
0	initData.stakingAsset	address	0x326C977E6efc84E512bB9C30f76E30c160eD06FB
0	initData.treasury	address	0x6053dE194226843E4FD99A82C1386B4C76E19E34
0	initData.admin1	address	0x0000000000000000000000000000000000000000
0	initData.admin2	address	0x0000000000000000000000000000000000000000
0	initData.cohortSize	uint256	25
0	initData.joinDuration	uint256	38880
0	initData.threshold	uint256	10
0	initData.assetAmount	uint256	5
0	initData.stakeDuration	uint256	129600
0	initData.topHatId	uint256	0
0	initData.cohortName	string	ETH Denver
0	initData.sbtName	string	ETHCO
0	initData.sbtSymbol	string	ETHCO
0	initData.baseUri	string	https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.myhandymans.com%2Fwp-content%2Fuploads%2F2018%2F09%2F5030349002651_01c.jpg&f=1&nofb=1&ipt=7fc17c4a11d94d0f16d2c6bf49c8eca5fa12642d85bc6bcfae906e16df8799a9&ipo=images
0	initData.shamanOn	bool	true
2	implementationSelector	uint256	1
*/

contract MockInits is IInitData {
    // fake DAO address on Goerli
    address constant molochDAO = 0x408818460de7d14E8f68e6142A49EA322C9d4AB1;
    address constant molochSafe = 0xcdBFcABc5d3F505ee1B6ec95c074d198A6f4Fb74;

    function _getMockInitData() internal pure returns (InitData[] memory) {
        /* ------------------------------------------------------------------------------ */

        InitData memory firstCohort = InitData(
            molochDAO,
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB,
            molochSafe,
            address(0),
            address(0),
            25,
            38880,
            10,
            5,
            129600,
            0,
            "KenBen",
            "Killroy",
            "KLR",
            "https://i.insider.com/5550df35eab8ea2131915ede?width=960&format=jpeg",
            true
        );

        /* ------------------------------------------------------------------------------ */

        InitData memory secondCohort = InitData(
            molochDAO,
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB,
            molochSafe,
            address(0),
            address(0),
            25,
            38880,
            10,
            5,
            129600,
            0,
            "KanBan",
            "Leroy",
            "LER",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSky8HELqj0Psfx4dhCYuC8iRhluBF-4wsqaw&usqp=CAU",
            true
        );

        /* ------------------------------------------------------------------------------ */

        InitData memory thirdCohort = InitData(
            molochDAO,
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB,
            molochSafe,
            address(0),
            address(0),
            25,
            38880,
            10,
            5,
            129600,
            0,
            "Jenkins",
            "Jenks",
            "JNK",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQa7JdIkgQSv7QiK_wzCm2IAaHNnzVZ_HCXw&usqp=CAU",
            true
        );

        InitData[] memory _mockInit = new InitData[](3);

        _mockInit[0] = firstCohort;
        _mockInit[1] = secondCohort;
        _mockInit[2] = thirdCohort;

        return _mockInit;
    }
}
