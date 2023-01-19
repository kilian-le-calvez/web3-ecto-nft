import React from 'react'
import pathLogo from './ecto.png';
import './Header.css';

function Header({account}) {
    console.log(account) 
    return (
    <div className="App-header">
        <div className="App-header-center">
            <a href="#App-body">
            <div className="App-logo-background">
                <div className="App-logo-background-reverse">
                <img src={pathLogo} className="App-logo" alt="logo" />
                </div>
            </div>
            </a>
            {
                account != null ?
                <a href="#App-mint">
                    <div className="Title-Nft">Ectoplasma NFT</div>
                </a> :
                <div className="Title-Nft">You have to connect your wallet</div>
            }
        </div>
        </div>
    )
}

export default Header