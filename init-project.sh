mkdir project
cd project
npm init -y
npm install --save-dev hardhat
npx hardhat
npm install --save-dev chai @nomiclabs/hardhat-ethers ethers @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-chai-matchers

# You'll also want to install something called OpenZeppelin which is another library that's used a lot to develop secure smart contracts. We'll learn more about it later. For now, just install it :).
npm install @openzeppelin/contracts