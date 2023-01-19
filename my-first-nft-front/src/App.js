import React from 'react';

import './App.css';

import Header from './components/Header';
import Utils from './components/Utils';
import Mint from './components/Mint';

function App() {
  const [account, setAccount] = React.useState(null);

  React.useEffect(() => {
    Utils.getConnectedAccount().then((account) => {
      setAccount(account);
    });
  }, [])

  async function connectWallet() {
    setAccount(await Utils.connectWallet());
  }

  return (
    <div className="App">
      <div className="App-bar">
        {
        account == null ?
        <div onClick={connectWallet} className="Button-connect-wallet">Connect Wallet</div> :
        <div className="Button-connect-wallet Button-connected-wallet">Welcome Mr. {account.substring(0,5)}...{account.substring(account.length - 5, account.length)}</div>
        }
      </div>
      <Header account={account}></Header>
      <div id="App-body" className="App-body">
        <div className="Text-container">
          {Utils.textDescription1.split(' ').map((elem, index) => {
            return <span key={index} className='Text-description-word'>{elem}</span>
          })}
        </div>
        <div className="Text-container">
          {Utils.textDescription2.split(' ').map((elem, index) => {
            return <span key={index} className='Text-description-word'>{elem}</span>
          })}
        </div>
        <div className="Text-container">
          {Utils.textDescription3.split(' ').map((elem, index) => {
            return <span key={index} className='Text-description-word'>{elem}</span>
          })}
        </div>
      </div>
      {
      account == null ? null :
      <Mint></Mint>
      }
    </div>
  );
}

export default App;
