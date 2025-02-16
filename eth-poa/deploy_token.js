import { Web3, HttpProvider } from 'web3';
import * as fs from 'fs';

const web3 = new Web3(new HttpProvider('http://127.0.0.1:8545'));

// Đọc ABI và bytecode của contract
const abi = JSON.parse(fs.readFileSync('TokenA_sol_TokenA.abi', 'utf8'));
const bytecode = fs.readFileSync('TokenA_sol_TokenA.bin', 'utf8');

// Địa chỉ tài khoản của bạn
const account = '0xb5AF356B4320D26EDA955ab77a91f4d2c2BF1b89';

// Thêm private key vào wallet của Web3
web3.eth.accounts.wallet.add('0x50f9a5fd2daf88abbb20d7bafb556bc619de14d2e2dc02ebda1fa48d8db1c113'); // private key của tài khoản

const contract = new web3.eth.Contract(abi);


const deployTx = contract.deploy({
    data: bytecode,
    arguments: [100000000]
});

const gasEstimate = await deployTx.estimateGas();
console.log(`Estimated Gas: ${gasEstimate}`);

deployTx.send({
    from: account,
    gas: Number(gasEstimate) + 50000,  // Thêm buffer gas
    gasPrice: web3.utils.toWei('5', 'gwei')
})
.on('receipt', (receipt) => {
    console.log('Contract deployed at:', receipt.contractAddress);
});
;