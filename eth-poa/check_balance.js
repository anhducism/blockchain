import { Web3, HttpProvider } from 'web3';
import * as fs from 'fs';

const web3 = new Web3(new HttpProvider('http://127.0.0.1:8545'));

async function checkBalance(address) {
  const balance = await web3.eth.getBalance(address);
  console.log(`Balance: ${address} ${web3.utils.fromWei(balance, 'ether')} ETH`);
}

const contractAddress = "0x5022051f6ef33a5820cf7071682da9774e64a388"; // Địa chỉ contract ERC-20

// ABI của contract (chỉ cần phần balanceOf)
const abi = JSON.parse(fs.readFileSync('TokenA_sol_TokenA.abi', 'utf8'));

const contract = new web3.eth.Contract(abi, contractAddress);

// Gọi balanceOf để kiểm tra số dư
async function checkBalanceToken(recipient) {
  const balance = await contract.methods.balanceOf(recipient).call();
  console.log(`Số dư token của ${recipient}:`, web3.utils.fromWei(balance, 'ether'), "Token");
}

checkBalance('0xb5AF356B4320D26EDA955ab77a91f4d2c2BF1b89');
checkBalance('0x72869AF07E55F50809D1A0Fad5E0372D781EE78c');
checkBalance('0x1E7444D77CfBCe7362252Dc16C17ea3EB1d5cF2F');

checkBalanceToken('0xb5AF356B4320D26EDA955ab77a91f4d2c2BF1b89');
checkBalanceToken('0x72869AF07E55F50809D1A0Fad5E0372D781EE78c');
checkBalanceToken('0x1E7444D77CfBCe7362252Dc16C17ea3EB1d5cF2F');
