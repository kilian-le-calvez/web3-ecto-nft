// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "./words.sol";
import "./librairies/base64.sol";

contract MyEpicNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private tokenToUri;
    mapping(address => uint256[]) private addressToTokens;
    mapping(address => string) uriToMint;

    event NewNFTMinted(address sender, uint256 tokenId);

    constructor() ERC721("EctoplasmaNFT", "ECTO") {
        console.log("This is my NFT contract. Whoa!");
    }

    function random(
        uint number,
        uint timestamp,
        uint difficulty,
        address sender
    ) public pure returns (uint) {
        return
            uint(keccak256(abi.encodePacked(timestamp, difficulty, sender))) %
            number;
    }

    function getTokenUri() public view returns (string memory) {
        string memory jsonEncoded = threeWordsToJsonBase64Nft(
            getFirstWord(
                random(10, block.timestamp, block.difficulty, msg.sender)
            ),
            getSecondWord(
                random(10, block.timestamp, block.difficulty, msg.sender)
            ),
            getThirdWord(
                random(10, block.timestamp, block.difficulty, msg.sender)
            )
        );
        string memory tokenUri = string(
            abi.encodePacked("data:application/json;base64,", jsonEncoded)
        );
        return tokenUri;
    }

    function makeNFT() public {
        uint256 newItemId = _tokenIds.current();
        // tokenToUri[newItem] = uriToMint[msg.sender];
        addressToTokens[msg.sender].push(newItemId);
        _safeMint(msg.sender, newItemId);
        // _setTokenURI(newItemId, finalTokenUri);
        _tokenIds.increment();
        emit NewNFTMinted(msg.sender, newItemId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId));
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            tokenId,
            msg.sender
        );
        return getTokenUri();
    }

    function getAllNft() public view returns (uint256[] memory) {
        return addressToTokens[msg.sender];
    }
}
