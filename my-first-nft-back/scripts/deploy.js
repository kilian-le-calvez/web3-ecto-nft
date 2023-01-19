function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory('MyEpicNFT');
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);
  
    // for (var i = 0; i < 5; i++) {
    //   // Call the function.
      // let txn = await nftContract.makeNFT()
    //   // Wait for it to be mined.
      // await txn.wait()
      // console.log("Minted NFT #" + i)
    //   sleep(10000)
      // console.log("Created")
    // }
  
    // txn = await nftContract.makeNFT()
    // // Wait for it to be mined.
    // await txn.wait()
    // console.log("Minted NFT #2")
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();