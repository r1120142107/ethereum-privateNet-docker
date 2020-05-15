const Web3 = require('web3');
const web3 = new Web3(new Web3.providers
	.HttpProvider('http://localhost:8545'));
const path = require('path');

// 1. 拿到 abi 和 bytecode 
const contractPath = path.resolve(__dirname,
	'../compiled/Coin.json');
const {
	interface,
	bytecode
} = require(contractPath)

const abi = JSON.parse(interface);
const contract = web3.eth.contract(abi);
const _from = web3.eth.accounts[0];
const txObj = {data:bytecode, from:_from, gas:500000};
let contractInstnce = contract.new(txObj, (err,res)=>{
	if(err)
    console.log("Error: ",err);
  else
    console.log("result: ", res);
});
console.log("contract address", )

