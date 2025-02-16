const { ethers } = require("ethers");
const fs = require("fs");

// Read the keystore file (the JSON file containing the keystore)
const keystore = fs.readFileSync("E:/Blockchain/eth-poa/node1/keystore/UTC--2025-02-16T07-20-32.678935200Z--b5af356b4320d26eda955ab77a91f4d2c2bf1b89", "utf8");

// Password used to decrypt the keystore
const password = "123456";

// Use ethers.js to decrypt the keystore and extract the private key
async function getPrivateKey() {
  try {
	  console.log('xxxxxxxxx');
    const wallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
    console.log("Private Key:", wallet.privateKey);
  } catch (error) {
    console.error("Error decrypting keystore:", error);
  }
}

// Call the function
getPrivateKey();
