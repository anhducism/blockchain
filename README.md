Private network dung co che PoA

1. Tao folder
cd E:\Blockchain
mkdir ethereum-poa
cd ethereum-poa

2. Tao folder node
mkdir node1 node2 node3

3. Tao account cho cac node
geth --datadir node1 account new
geth --datadir node2 account new
geth --datadir node3 account new

Ket qua:
node1
Public address of the key:   0xb5AF356B4320D26EDA955ab77a91f4d2c2BF1b89
Path of the secret key file: node1\keystore\UTC--2025-02-16T07-20-32.678935200Z--b5af356b4320d26eda955ab77a91f4d2c2bf1b89

node2
Public address of the key:   0x72869AF07E55F50809D1A0Fad5E0372D781EE78c
Path of the secret key file: node2\keystore\UTC--2025-02-16T07-21-12.314421800Z--72869af07e55f50809d1a0fad5e0372d781ee78c

node3
Public address of the key:   0x1E7444D77CfBCe7362252Dc16C17ea3EB1d5cF2F
Path of the secret key file: node3\keystore\UTC--2025-02-16T07-21-32.594422200Z--1e7444d77cfbce7362252dc16c17ea3eb1d5cf2f

4. Tao file genesis
genesis.json 

5. Khoi tao blockchain
geth --datadir node1 init genesis.json
geth --datadir node2 init genesis.json
geth --datadir node3 init genesis.json

6. Start 3 node (Run cmd as administrator)

6.1 Start node 1 validator
geth --datadir node1 --networkid 2024 --port 30303 --http --http.addr 0.0.0.0 --http.port 8545 --http.api eth,net,web3,admin,personal --mine --unlock b5AF356B4320D26EDA955ab77a91f4d2c2BF1b89 --password E:\Blockchain\eth-poa\node1\password.txt --miner.etherbase b5AF356B4320D26EDA955ab77a91f4d2c2BF1b89 --allow-insecure-unlock --nodiscover --ipcdisable

Start node 1 xong copy dong log co format "self="enode://xxx@127.0.0.1:30303" 
Vi du: self="enode://5cc6fd15fb9070b9e3bae6127b3295017bd6eb06a354af28b9ed997ceabc6799554d4c5452a93089b6a250e6b9d47a6d93989fc72cf5601be667922b44027c40@127.0.0.1:30303

6.2 Start node 2 follower
geth --datadir node2 --networkid 2024 --port 30304 --http --http.addr 0.0.0.0 --http.port 8546 --http.api eth,net,web3,admin,personal --bootnodes "enode://5cc6fd15fb9070b9e3bae6127b3295017bd6eb06a354af28b9ed997ceabc6799554d4c5452a93089b6a250e6b9d47a6d93989fc72cf5601be667922b44027c40@127.0.0.1:30303"

6.3 Start node 3 follower
geth --datadir node3 --networkid 2024 --port 30305 --http --http.addr 0.0.0.0 --http.port 8547 --http.api eth,net,web3,admin,personal --bootnodes "enode://5cc6fd15fb9070b9e3bae6127b3295017bd6eb06a354af28b9ed997ceabc6799554d4c5452a93089b6a250e6b9d47a6d93989fc72cf5601be667922b44027c40@127.0.0.1:30303"

7. Viet smart contract cho 2 token:

7.1 TokenA.sol
7.2 TokenB.sol

8. Compile smart contract ra file "abi" va "bin" su dung solcjs:

8.0 Cai solcjs
npm install solc@0.8.19

8.1 Compile TokenA
solcjs --optimize --bin --abi TokenA.sol

8.1 Compile TokenB
solcjs --optimize --bin --abi TokenB.sol

9. Deploy smart contract
Dung tai khoan node1 va private key convert tu file keystore (Dung java, js hoac python de convert)
9.1 Mo cmd chay lenh:
node deploy_token.js
Sau khi chay thanh cong -> copy contract address va luu lai

10. Transfer token va check balance:
10.1 Mo cmd chay lenh check balance de kiem tra balance cua 3 tai khoan truoc khi transfer:
node check_balance.js

10.2 Goi ham transfer token trong smart contract
node send_token.js 0xb5AF356B4320D26EDA955ab77a91f4d2c2BF1b89 0x72869AF07E55F50809D1A0Fad5E0372D781EE78c 0x50f9a5fd2daf88abbb20d7bafb556bc619de14d2e2dc02ebda1fa48d8db1c113 150

Giai thich
0xb5AF356B4320D26EDA955ab77a91f4d2c2BF1b89: address cua acc gui (node1)
0x72869AF07E55F50809D1A0Fad5E0372D781EE78c: address cua acc nhan (node2)
0x50f9a5fd2daf88abbb20d7bafb556bc619de14d2e2dc02ebda1fa48d8db1c113: private key cua acc gui (node1)
150: So token gui

10.3 Mo cmd chay lenh check balance de kiem tra balance cua 3 tai khoan sau khi transfer:
node check_balance.js
