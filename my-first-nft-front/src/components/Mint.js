import React from 'react'

import Utils from './Utils';

import './Mint.css';

import myEpicNft from '../utils/MyEpicNFT.json';

import { ethers } from 'ethers';

const hexToDecimal = hex => parseInt(hex, 16);

function Mint() {
    const [isMining, setIsMining] = React.useState(false);
    const [nftUrls, setNftUrls] = React.useState([]);

    async function mintNFT() {
        const { ethereum } = window;

        try {
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(Utils.contract_address, myEpicNft.abi, signer);

                console.log("Going to pop wallet now to pay gas...")
                let nftTxn = await connectedContract.makeNFT({gasLimit: 300000});
                setIsMining(true);

                console.log("Mining...please wait.")
                await nftTxn.wait();

                console.log(`Mined, see transaction: https://goerli.etherscan.io/tx/${nftTxn.hash}`);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
        setIsMining(false)
    }


    async function getNftUrls() {
        const { ethereum } = window;

        try {
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(Utils.contract_address, myEpicNft.abi, signer);

                console.log("Going to pop wallet now to pay gas...")
                let nftTxn = await connectedContract.getAllNft();

                let array = [];
                console.log(nftTxn);
                for (let i = 0; i < nftTxn.length; i++) {
                    let url = `https://testnets.opensea.io/assets/mumbai/${Utils.contract_address}/${hexToDecimal(nftTxn[i]._hex)}`
                    array.push(url);
                }
                // const idItem = hexToDecimal(nftTxn.value._hex);
                console.log(array)
                // console.log(idItem);

                setNftUrls(array);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }
        setIsMining(false)
    }

    React.useEffect(() => {
        getNftUrls();
    }, []);

  return (
    <div id="App-mint" className="App-mint">
        {
            nftUrls.length >= 20 ?
            <div className="Button-mint">You have 20 NFT already !</div> 
            :
            <div onClick={isMining ? null : mintNFT} className="Button-mint">{isMining ? "WAIT..." : `MINT ${nftUrls.length}/20`}</div> 
        }
        <div className="Container-nft">
        {
            nftUrls.map((elem, index) => {
                return <a key={index} target="_blank" rel="noopener noreferrer" href={elem} className="Link-Nft">NFT #{index + 1}</a>
            })
        }
        </div>
    </div>
  )
}

export default Mint