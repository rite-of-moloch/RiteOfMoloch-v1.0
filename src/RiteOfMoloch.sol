// SPDX-License-Identifier: MIT
// @author st4rgard3n, bitbeckers, MrDeadce11, huntrr / Raid Guild
pragma solidity ^0.8.13;

import {CountersUpgradeable} from "openzeppelin-contracts-upgradeable/utils/CountersUpgradeable.sol";
import {ERC721Upgradeable, ContextUpgradeable} from "openzeppelin-contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";
import {IInitData} from "src/interfaces/IInitData.sol";
import {IRiteOfMoloch} from "src/interfaces/IROM.sol";
import {HatsAccessControl, IHats, Context} from "hats-auth/HatsAccessControl.sol";
import {IBaal} from "src/baal/IBaal.sol";

contract RiteOfMoloch is
    IInitData,
    ERC721Upgradeable,
    HatsAccessControl,
    IRiteOfMoloch
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    bytes32 public constant ADMIN = keccak256("ADMIN");

    /*************************
     MAPPINGS AND ARRAYS
     *************************/

    // initiation participant token balances
    mapping(address => uint256) internal _staked;

    // the time a participant joined the initiation
    mapping(address => uint256) public deadlines;

    // initiates by season: season# => id# => initiateAddress
    mapping(uint256 => mapping(uint256 => address)) internal initiates;

    /*************************
     STATE VARIABLES
     *************************/

    CountersUpgradeable.Counter internal _tokenIdCounter;

    // Baal DAO
    IBaal public baal;

    // Baal sharesToken
    IERC20 private _sharesToken;

    // ERC20 interface for staking asset
    IERC20 private _token;

    // cohort's base URI for accessing token metadata
    string internal __baseURI;

    // cohort name
    string public cohortName;

    // cohort season counter (increases after each Sacrifice)
    uint256 public cohortSeason;

    // cohort size limit
    uint256 public cohortSize;

    // cohort size count
    uint256 public cohortCounter;

    // cohort join duration
    uint256 public joinDuration;

    // cohort join expiration
    uint256 public joinEndTime;

    // minimum amount of dao shares required to be considered a member
    uint256 public minimumShare;

    // minimum amount of staked tokens required to join the initiation
    uint256 public minimumStake;

    // maximum length of time for initiates to succeed at joining
    uint256 public maximumTime;

    // admin fee / percentage cut of sacrifice
    uint256 public adminFee;

    // DAO treasury address
    address public daoTreasury;

    // admin treasury address
    address public adminTreasury;

    // Hats protocol:
    IHats public HATS;

    // Hats variables
    uint256 public topHat;
    uint256 public adminHat;

    // todo: rm admin vars and replace w/ Hats Protocol subgraph query
    address public admin1;
    address public admin2;

    // Hats initializer lock
    bool private initHatTreeLock;

    constructor() {
        _disableInitializers();
    }

    /**
     * @dev Deploys a new clone proxy instance for cohort staking
     * @param initData the complete initialization data
     * @param caller_ the deployer of the new cohort clone
     */
    function initialize(
        InitData calldata initData,
        address hatsProtocol,
        address caller_
    ) external initializer {
        // increment the counter so our first sbt has token id of one
        _tokenIdCounter.increment();

        // set cohort season to 1
        cohortSeason = 1;

        // set cohort name
        cohortName = initData.cohortName;

        // set size limit on cohort
        cohortSize = initData.cohortSize;

        // set join duration
        joinDuration = initData.joinDuration;

        // set join expiration
        joinEndTime = block.timestamp + joinDuration;

        // initialize the SBT
        __ERC721_init(initData.sbtName, initData.sbtSymbol);

        // set the interface for accessing the Baal's public members mapping
        baal = IBaal(initData.membershipCriteria);

        // reference sharesToken of Baal
        _sharesToken = IERC20(initData.stakingAsset); // <= for local testing only
        // _sharesToken = IERC20(baal.sharesToken()); // <= correct

        // set the DAO treasury daoAddress
        daoTreasury = initData.daoTreasury;

        // set the admin treasury daoAddress
        adminTreasury = initData.adminTreasury;

        // set the adminFee to pay admin at sacrifice
        adminFee = initData.adminFee / 100;

        // set the interface for accessing the required staking token
        _token = IERC20(initData.stakingAsset);

        // set the minimum stake requirement
        _setMinimumStake(initData.assetAmount);

        // set the minimum shares
        _setShareThreshold(initData.threshold);

        // set the cohort staking duration
        _setMaxDuration(initData.stakeDuration);

        // set the cohort token's base uri
        _setBaseUri(initData.baseUri);

        // point to Hats Protocol
        HATS = IHats(hatsProtocol);

        // point access control functionality to Hats protocol
        _changeHatsContract(hatsProtocol);

        if (initData.shamanOn) {
            bytes memory shamanData;

            // encode shaman proposal
            shamanData = _encodeShamanProposal(address(this), 2);

            // submit SHAMAN proposal
            bytes[] memory data = new bytes[](1);
            data[0] = shamanData;

            address[] memory targets = new address[](1);
            targets[0] = address(baal);

            _submitBaalProposal(_encodeMultiMetaTx(data, targets), 1);
        }

        if (HATS.isWearerOfHat(daoTreasury, initData.topHatId)) {
            bytes memory accessHatData;
            bytes memory buildHatData;

            // encode hats proposals; access topHat and initialize hat tree
            topHat = initData.topHatId;
            admin1 = initData.admin1;
            admin2 = initData.admin2;
            accessHatData = _encodeTransferHat(
                topHat,
                daoTreasury,
                address(this)
            );
            buildHatData = _encodeBuildHatTree(caller_, admin1, admin2);

            // submit HATS proposal
            bytes[] memory data = new bytes[](2);
            data[0] = accessHatData;
            data[1] = buildHatData;

            address[] memory targets = new address[](2);
            targets[0] = address(HATS);
            targets[1] = address(this);

            _submitBaalProposal(_encodeMultiMetaTx(data, targets), 2);
        } else {
            // creates a new topHat, initialize hat tree
            topHat = HATS.mintTopHat(address(this), "ROM TopHat", "");
            initializeHatTree(caller_, initData.admin1, initData.admin2);
        }
    }

    /*************************
     MODIFIERS
     *************************/

    /**
     * @dev Modifier for preventing calls from contracts
     * Safety feature for preventing malicious contract call backs
     */
    modifier callerIsUser() {
        // for testing in Forge: disable
        // require(tx.origin == msg.sender, "The caller is another contract!");
        _;
    }

    /**
     * @dev Modifier for enforcing function callable from DAO members only
     * Allows decentralized control by DAO members
     */
    modifier onlyMember() {
        _checkMember();
        _;
    }

    /**
     * @dev Modifier for checkin that RiteOfMoloch has Shaman privileges
     * Prevents calling functions that will revert
     */
    modifier onlyShaman() {
        // _checkManager();
        _;
    }

    /*************************
     USER FUNCTIONS
     *************************/

    /**
     * @dev Allows users to join the DAO initiation
     * @param user the address which will be activated for the cohort
     * Stakes required tokens and mints soul bound token
     */
    function joinInitiation(address user) public callerIsUser {
        require(block.timestamp <= joinEndTime, "This cohort is now closed");
        require(
            _tokenIdCounter.current() <= cohortSize,
            "This cohort is already full"
        );

        // enforce the initiate or sponsor transfers correct tokens to the contract
        require(_stake(user), "Staking failed!");

        // increment cohort count
        cohortCounter++;

        // add initiate to tracker by season and id
        initiates[cohortSeason][cohortCounter] = msg.sender;

        // issue a soul bound token
        _soulBind(user);
    }

    /**
     * @dev Allows DAO members to claim their initiation stake
     */
    function claimStake() external onlyMember {
        require(_claim(), "Claim failed!");
    }

    /**
     * @dev Allows initiates to log permanent feedback data on-chain
     * @param feedback "Developers do something!"
     * Doesn't change contract state; simply passes call-data through an event
     */
    function cryForHelp(string calldata feedback) public {
        require(balanceOf(msg.sender) == 1, "Only cohort participants!");
        emit Feedback(msg.sender, daoTreasury, feedback);
    }

    function checkStake(address user) external view returns (uint256) {
        return _staked[user];
    }

    /*************************
     ACCESS CONTROL FUNCTIONS
     *************************/

    function changeJoinTimeDuration(
        uint256 _joinDuration
    ) external onlyRole(ADMIN) {
        joinDuration = _joinDuration;
    }

    function extendJoinTimeLimit(uint256 _extension) external onlyRole(ADMIN) {
        joinEndTime = joinEndTime + _extension;
    }

    function changeJoinSizeLimit(uint256 _cohortSize) external onlyRole(ADMIN) {
        cohortSize = _cohortSize;
    }

    /**
     * @dev Allows DAO members to change the staking requirement
     * @param newMinimumStake the minimum quantity of tokens a user must stake to join the cohort
     */
    function setMinimumStake(uint256 newMinimumStake) external onlyRole(ADMIN) {
        _setMinimumStake(newMinimumStake);
    }

    /**
     * @dev Allows changing the DAO member share threshold
     * @param newShareThreshold the number of shares required to be considered a DAO member
     */
    function setShareThreshold(
        uint256 newShareThreshold
    ) external onlyRole(ADMIN) {
        _setShareThreshold(newShareThreshold);
    }

    /**
     * @dev Allows changing the maximum initiation duration
     * @param newMaxTime the length in seconds until an initiate's stake is forfeit
     */
    function setMaxDuration(uint256 newMaxTime) external onlyRole(ADMIN) {
        _setMaxDuration(newMaxTime);
    }

    /**
     * @dev If ROM is a Shaman: Allows minting shares of Baal DAO to become member
     * @param to the list of initiate addresses who have passed their rites to become member
     */
    function batchMintBaalShares(
        address[] calldata to
    ) external onlyRole(ADMIN) onlyShaman {
        uint256 length = to.length;
        uint256[] memory shares = new uint256[](length);

        // can only mint minimum share for Baal DAO membership
        for (uint256 i = 0; i < length; i++) {
            shares[i] = minimumShare;
        }

        baal.mintShares(to, shares);
    }

    /**
     * @param _to initiate address who has passed their rite to become member
     */
    function singleMintBaalShares(
        address _to
    ) external onlyRole(ADMIN) onlyShaman {
        uint256[] memory shares = new uint256[](1);
        address[] memory to = new address[](1);

        // can only mint minimum share for Baal DAO membership
        shares[0] = minimumShare;
        to[0] = _to;

        baal.mintShares(to, shares);
    }

    /**
     * @dev Bleeds the life force of failed initiates into the treasury
     */
    function sacrifice() external onlyRole(ADMIN) {
        _darkRitual();
    }

    /**
     * @dev Bleeds the life force of a single failed initiate into the treasury
     */
    function slaughter(address _sacrificialLamb) external onlyRole(ADMIN) {
        _bloodLetting(_sacrificialLamb);
        cohortCounter--;
    }

    /*************************
     PRIVATE OR INTERNAL
     *************************/

    function _setMinimumStake(uint256 newMinimumStake) internal virtual {
        // enforce that the minimum stake isn't zero
        require(
            newMinimumStake > 0,
            "Minimum stake must be greater than zero!"
        );

        // set the minimum staking requirement
        minimumStake = newMinimumStake;

        //  new staking requirement data
        emit ChangedStake(newMinimumStake);
    }

    function _setShareThreshold(uint256 newShareThreshold) internal virtual {
        // enforce that the minimum share threshold isn't zero
        require(
            newShareThreshold > 0,
            "Minimum shares must be greater than zero!"
        );

        // set the minimum number of DAO shares required to graduate
        minimumShare = newShareThreshold;

        // log data for the new minimum share threshold
        emit ChangedShares(newShareThreshold);
    }

    function _setMaxDuration(uint256 newMaxTime) internal virtual {
        // enforce that the minimum time is greater than 1 week
        require(newMaxTime > 0, "Minimum duration must be greater than 0!");

        // set the maximum length of time for initiations
        maximumTime = newMaxTime;

        // log the new duration before stakes can be slashed
        emit ChangedTime(newMaxTime);
    }

    /**
     * @dev Sets base URI during initialization
     * @param baseURI the base uri for accessing token metadata
     */
    function _setBaseUri(string calldata baseURI) internal virtual {
        __baseURI = baseURI;
    }

    /**
     * @dev Stakes the user's tokens
     * @param _user the address to activate for the cohort
     */
    function _stake(address _user) internal virtual returns (bool) {
        // enforce that the initiate hasn't previously staked
        require(balanceOf(_user) == 0, "Already joined the initiation!");

        // change the initiate's stake total
        _staked[_user] = minimumStake;

        // set the initiate's deadline
        deadlines[_user] = block.timestamp + maximumTime;

        return _token.transferFrom(msg.sender, address(this), minimumStake);
    }

    /**
     * @dev Claims the successful new members stake
     */
    function _claim() internal virtual returns (bool) {
        address msgSender = msg.sender;
        // enforce that the initiate has stake
        require(_staked[msgSender] > 0, "User has no stake!!");

        // store the user's balance
        uint256 balance = _staked[msgSender];

        // delete the balance
        delete _staked[msgSender];

        // delete the deadline timestamp
        delete deadlines[msgSender];

        // log data for this successful claim
        emit Claim(msgSender, balance);

        // return the new member's original stake
        return _token.transfer(msgSender, balance);
    }

    /**
     * @dev Mints soul bound tokens to the initiate
     * @param _user the recipient of the cohort SBT
     */
    function _soulBind(address _user) internal virtual {
        // store the current token counter
        uint256 tokenId = _tokenIdCounter.current();

        // increment the token counter
        _tokenIdCounter.increment();

        // mint the user's soul bound initiation token
        _mint(_user, tokenId);

        // log the initiation data
        emit Initiation(
            _user,
            msg.sender,
            tokenId,
            minimumStake,
            deadlines[_user]
        );
    }

    function _darkRitual() internal virtual {
        // the total amount of blood debt
        uint256 blood;
        uint256 bloodCut;
        uint256 newCohortCount;
        uint256 season = cohortSeason;
        uint256 nextSeason = cohortSeason + 1;

        for (uint256 i = 1; i <= cohortCounter; i++) {
            // store each initiate's address
            address initiate = initiates[season][i];
            uint256 index = 1;

            if (_staked[initiate] > 0) {
                if (block.timestamp > deadlines[initiate]) {
                    // slash failed initiate
                    blood += _bloodLetting(initiate);
                    delete initiates[season][i];
                } else {
                    // carry-over non-failed active initiates into next cohort
                    initiates[nextSeason][index] = initiate;
                    index++;
                    newCohortCount++;
                    delete initiates[season][i];
                }
            } else {
                // delete initiates that have already claimed their stake or been slaughtered
                delete initiates[season][i];
            }
        }

        // calculate blood cut and penance for admins
        if (adminFee > 0) {
            bloodCut = blood * adminFee;
            require(
                _token.transfer(adminTreasury, bloodCut),
                "Failed Penance!"
            );
        }

        // blood feast for Baal
        require(
            _token.transfer(daoTreasury, blood - bloodCut),
            "Failed Sacrifice!"
        );

        // reset cohortCount, reset joinInitiation period, increase season
        cohortCounter = newCohortCount;
        joinEndTime = block.timestamp + joinDuration;
        cohortSeason++;
    }

    function _bloodLetting(
        address _failedInitiate
    ) internal virtual returns (uint256) {
        // access each initiate's balance
        uint256 balance = _staked[_failedInitiate];

        // remove the sacrifice's balance
        delete _staked[_failedInitiate];

        // remove the sacrifice's starting time
        delete deadlines[_failedInitiate];

        // log sacrifice data
        emit Sacrifice(_failedInitiate, balance, msg.sender);

        return balance;
    }

    /**
     * @dev Authenticates users through the DAO contract
     */
    function _checkMember() internal virtual {
        uint256 shares = _sharesToken.balanceOf(msg.sender);
        require(shares >= minimumShare, "You must be a member!");
    }

    function _checkManager() internal virtual {
        require(
            baal.isManager(address(this)) == true,
            "This RiteOfMoloch is not a Manager-Shaman!"
        );
    }

    /*************************
     VIEW AND PURE FUNCTIONS
     *************************/

    /**
     * @dev returns the user's deadline for onboarding
     */
    function getDeadline(address user) public view returns (uint256) {
        return deadlines[user];
    }

    /**
     * @dev returns the user's member status
     */
    function isMember(address user) public view returns (bool) {
        uint256 shares = _sharesToken.balanceOf(user);

        return (shares >= minimumShare);
    }

    /*************************
     OVERRIDES
     *************************/

    function _msgSender()
        internal
        view
        override(Context, ContextUpgradeable)
        returns (address)
    {
        return msg.sender;
    }

    function _msgData()
        internal
        pure
        override(Context, ContextUpgradeable)
        returns (bytes calldata)
    {
        return msg.data;
    }

    function _baseURI() internal view override returns (string memory) {
        return __baseURI;
    }

    // Cohort NFTs cannot be transferred
    function _beforeTokenTransfer(
        address _from,
        address,
        uint256 /* firstTokenId */,
        uint256
    ) internal virtual override {
        require(_from == address(0), "SBT cannot be transferred");
    }

    // The following functions are overrides required by Solidity.
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721Upgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /*************************
     HATS ACCESS CONTROL SETUP
     *************************/

    /**
     * @dev create & mint admin hats to deployer & admin addresses
     * DAO can grant/revoke adminHats (after topHat is transferred below)
     */
    function initializeHatTree(
        address _deployer,
        address _admin1,
        address _admin2
    ) public {
        require(initHatTreeLock == false, "Hats already initialized");
        initHatTreeLock = true;

        // admin privileges: access control
        adminHat = HATS.createHat(
            topHat,
            "ROM Admin",
            3,
            address(baal),
            address(baal),
            true,
            ""
        );

        // grant Hat Access Control role
        _grantRole(ADMIN, adminHat);

        HATS.mintHat(adminHat, _deployer);

        if (_admin1 != address(0)) {
            HATS.mintHat(adminHat, _admin1);
        }
        if (_admin2 != address(0)) {
            HATS.mintHat(adminHat, _admin2);
        }

        // return topHat to  Baal Avatar
        HATS.transferHat(topHat, address(this), daoTreasury);
    }

    /**
     * @dev send proposal to Baal to mint another admin
     * protected by Hats protocol logic and Baal governance
     */
    function mintAdminHatProposal(address _to) external {
        bytes memory hatData;

        hatData = _encodeMintHat(adminHat, _to);

        bytes[] memory data = new bytes[](1);
        data[0] = hatData;

        address[] memory targets = new address[](1);
        targets[0] = address(HATS);

        _submitBaalProposal(_encodeMultiMetaTx(data, targets), 3);
    }

    /**
     * @dev send proposal to Baal to transfer adminHat to new EOA
     * protected by Hats protocol logic and Baal governance
     */
    function transferAdminHatProposal(address _from, address _to) external {
        bytes memory hatData;

        hatData = _encodeTransferHat(adminHat, _from, _to);

        bytes[] memory data = new bytes[](1);
        data[0] = hatData;

        address[] memory targets = new address[](1);
        targets[0] = address(HATS);

        _submitBaalProposal(_encodeMultiMetaTx(data, targets), 4);
    }

    /*************************
     ENCODING
     *************************/

    /**
     * @dev Encoding function for Baal Shaman
     */
    function _encodeShamanProposal(
        address shaman,
        uint256 permission
    ) internal pure returns (bytes memory) {
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

    /**
     * @dev Encoding function for accessing an existing topHat
     */
    function _encodeTransferHat(
        uint256 _hat,
        address _from,
        address _to
    ) internal returns (bytes memory) {
        // todo: rm admin vars and replace w/ Hats Protocol subgraph query
        if (admin1 == _from) {
            admin1 = _to;
        } else if (admin2 == _from) {
            admin2 = _to;
        }
        return
            abi.encodeWithSignature(
                "transferHat(uint256,address,address)",
                _hat,
                _from,
                _to
            );
    }

    /**
     * @dev Encoding function for minting an adminHat
     */
    function _encodeMintHat(
        uint256 _hat,
        address _to
    ) internal returns (bytes memory) {
        // todo: rm admin vars and replace w/ Hats Protocol subgraph query
        if (admin1 == address(0)) {
            admin1 = _to;
        } else if (admin1 != address(0) && admin2 == address(0)) {
            admin2 = _to;
        }
        return abi.encodeWithSignature("mintHat(uint256,address)", _hat, _to);
    }

    /**
     * @dev Encoding function for building on existing Hats tree
     */
    function _encodeBuildHatTree(
        address _deployer,
        address _admin1,
        address _admin2
    ) internal pure returns (bytes memory) {
        return
            abi.encodeWithSignature(
                "initializeHatTree(address,address,address)",
                _deployer,
                _admin1,
                _admin2
            );
    }

    /**
     * @dev Format multiSend for encoded functions
     */
    function _encodeMultiMetaTx(
        bytes[] memory _data,
        address[] memory _targets
    ) internal pure returns (bytes memory) {
        bytes memory metaTx;

        for (uint256 i = 0; i < _data.length; i++) {
            metaTx = abi.encodePacked(
                metaTx,
                uint8(0),
                _targets[i],
                uint256(0),
                uint256(_data[i].length),
                _data[i]
            );
        }
        return abi.encodeWithSignature("multiSend(bytes)", metaTx);
    }

    /**
     * @dev Submit voting proposal to Baal DAO
     */
    function _submitBaalProposal(
        bytes memory multiSendMetaTx,
        uint256 options
    ) internal {
        uint256 proposalOffering = baal.proposalOffering();
        require(msg.value == proposalOffering, "Missing tribute");

        string memory metaString;

        if (options == 1) {
            metaString = '{"proposalType": "ADD_SHAMAN", "title": "Rite of Moloch (ROM): Shaman Proposal", "description": "Assign ROM as a Manager-Shaman to mint minimum DAO shares"}';
        } else if (options == 2) {
            metaString = '{"proposalType": "BORROW_TOPHAT", "title": "Rite of Moloch (ROM): Hats Proposal", "description": "Create and mint ROM-Admin hats from DAO TopHat"}';
        } else if (options == 3) {
            metaString = '{"proposalType": "MINT_ADMINHAT", "title": "Rite of Moloch (ROM): Mint Admin Hat", "description": "Mint ROM-Admin hat to EOA"}';
        } else if (options == 4) {
            metaString = '{"proposalType": "TRANSFER_ADMINHAT", "title": "Rite of Moloch (ROM): Transfer Admin Hat", "description": "Transfer ROM-Admin hat to EOA"}';
        } else {
            metaString = '{"proposalType": "UNDEFINED", "title": "Rite of Moloch (ROM): undefined", "description": "Undefined"}';
        }

        baal.submitProposal{value: proposalOffering}(
            multiSendMetaTx,
            0,
            0,
            metaString
        );
    }
}
