import { ethers } from 'ethers';
import myEpicNft from '../utils/MyEpicNFT.json';

const textDescription1 = "Gengar is a dark purple, bipedal Pokémon with a roundish body. It has red eyes, a wide mouth that is usually curled into a sinister grin, and pointed ears. On its back are numerous spikes and it has smaller spikes on top of its head similar to tufty fur. Its arms and legs are short with three digits on both its hands and feet. It also has a stubby tail."
const textDescription2 = "Gengar has the ability to hide perfectly in the shadow of any object, granting it exceptional stealth. However, Gengar's body acts as a heat sink. Its presence cools the temperature of the surrounding area by nearly 10°F (5°C), because it absorbs the warmth. The anime has shown that Gengar can fly, possess people and other Pokémon, and extend its tongue by several meters."
const textDescription3 = "Gengar is very mischievous, and at times, malicious. It enjoys playing practical jokes and casting curses, such as pretending to be one's shadow, then behaving erratically. When the quarry notices, the Gengar takes delight in its victim's terror. However, Gengar has been known to be loyal to a Trainer who treats it well. Being the result of an evolution via trading, Gengar is rarely found in the wild, though they can be found in caves and dark places where shadows form. It is especially fond of urban areas such as cities and back alleys, but only during the night.";
const contract_address = "0xAcD0F4ee17459B40402530B41dcE917ECeB50792";

async function setupEventListener() {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(contract_address, myEpicNft.abi, signer);

      connectedContract.on("NewNFTMinted", (from, tokenId) => {
        console.log(from, tokenId.toNumber())
        alert("Sorry I had some troubles with solidity, please refresh the page to see your new minted NFT in the list :)")
      });
      console.log("Setup event listener!")
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

async function getConnectedAccount() {
    const { ethereum } = window;
  
    if (!ethereum) {
      console.log("Metamask extension not found");
      return null;
    }
    console.log("Metamask found");
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setupEventListener();
      return account;
    } else {
      console.log("No authorized account found");
    }
    return null;
}

async function connectWallet() {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
      setupEventListener();
      return accounts[0];
    } catch (error) {
      console.log(error);
    }
}

const myExport = { connectWallet, getConnectedAccount, textDescription1, textDescription2, textDescription3, contract_address };

export default myExport