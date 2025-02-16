import { Web3, HttpProvider } from 'web3';
import * as fs from 'fs';

const web3 = new Web3(new HttpProvider('http://127.0.0.1:8545'));


const contractAddress = "0x5022051f6ef33a5820cf7071682da9774e64a388"; // Địa chỉ smart contract
const fromAccount = process.argv[2]; // 100
const recipient = process.argv[3]; // "hello"
const privateKey = process.argv[4];
const amount = process.argv[5];
//const fromAccount = "0xb5AF356B4320D26EDA955ab77a91f4d2c2BF1b89"; // Địa chỉ ví gửi token
//const recipient = "0x72869AF07E55F50809D1A0Fad5E0372D781EE78c"; // Địa chỉ ví nhận token
//const privateKey = "0x50f9a5fd2daf88abbb20d7bafb556bc619de14d2e2dc02ebda1fa48d8db1c113"; // Khóa riêng tư của người gửi
//const amount = web3.utils.toWei("100", "ether"); // Số token (đã nhân với 10^18 nếu decimals = 18)

// ABI của contract (rút gọn chỉ giữ phần transfer)
const abi = JSON.parse(fs.readFileSync('TokenA_sol_TokenA.abi', 'utf8'));
const contract = new web3.eth.Contract(abi, contractAddress);

// Tạo transaction
async function sendToken() {
  const tx = {
    from: fromAccount,
    to: contractAddress,
    gas: 60000,
    gasPrice: web3.utils.toWei("5", "gwei"),
    data: contract.methods.transfer(recipient, amount).encodeABI()
  };

  // Ký giao dịch
  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  
  // Gửi giao dịch
  web3.eth.sendSignedTransaction(signedTx.rawTransaction)
    .on('receipt', (receipt) => {
      console.log("✅ Giao dịch thành công! Hash:", receipt.transactionHash);
    })
    .on('error', console.error);
}

sendToken();
