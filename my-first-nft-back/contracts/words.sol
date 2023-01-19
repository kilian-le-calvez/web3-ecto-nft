// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "./librairies/base64.sol";

function getFirstWord(uint index) pure returns (string memory) {
    string[10] memory words = [
        "Ecto",
        "Ectoplasma",
        "Ecta",
        "Ectoplasmo",
        "Ectopla",
        "Ectoplo",
        "Ectaplasma",
        "Ectaplasmo",
        "Ectoplame",
        "Ectoplome"
    ];
    return words[index];
}

function getSecondWord(uint index) pure returns (string memory) {
    string[10] memory words = [
        "Eat",
        "Drink",
        "Run",
        "Bite",
        "Haunt",
        "Accuse",
        "Cry",
        "Drive",
        "Like",
        "Sleep"
    ];
    return words[index];
}

function getThirdWord(uint index) pure returns (string memory) {
    string[10] memory words = [
        "Magazine",
        "Apple",
        "Vehicle",
        "Night",
        "Heart",
        "Dreams",
        "Energy",
        "Blood",
        "Pizza",
        "Piano"
    ];
    return words[index];
}

function getSvg(string[3] memory words) pure returns (string memory) {
    return
        string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">\r\n    <style>.base { fill: white; font-family: serif; font-size: 18px; }</style>\r\n    <rect width="100%" height="100%" fill="#8000ff" />\r\n    <text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
                words[0],
                words[1],
                words[2],
                "</text>\r\n</svg>"
            )
        );
}

function threeWordsToJsonBase64Nft(
    string memory firstWord,
    string memory secondWord,
    string memory thirdWord
) pure returns (string memory) {
    string memory svg = getSvg([firstWord, secondWord, thirdWord]);
    string memory svgEncoded = Base64.encode(bytes(svg));
    string memory image = string(
        abi.encodePacked("data:image/svg+xml;base64,", svgEncoded)
    );
    string memory rawJson = string(
        abi.encodePacked(
            '{"name":"',
            firstWord,
            secondWord,
            thirdWord,
            '","description":"An NFT from the highly acclaimed Ectoplasma collection","image":"',
            image,
            '"}'
        )
    );
    string memory jsonEncoded = Base64.encode(bytes(rawJson));
    return jsonEncoded;
}
