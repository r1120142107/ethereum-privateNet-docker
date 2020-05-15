const path = require('path'); 
const assert = require('assert'); 
const ganache = require('ganache-cli'); 
const Web3 = require('web3'); 
// 1. 配置 provider 
const web3 = new Web3(ganache.provider()); 
// 2. 拿到 abi 和 bytecode 
const contractPath = path.resolve(__dirname, 
'../compiled/Car.json'); 
const { interface, bytecode } = require(contractPath); 

let contract;
let accounts;
const initialBrand = "BMW";

describe("#contract",()=>{
  beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts();
		console.log('合约部署账户：', accounts[0]);
		contract = await new
		web3.eth.Contract(JSON.parse(interface))
			.deploy({
				data: bytecode,
				arguments: [initialBrand,22]
			})
			.send({
				from: accounts[0],
				gas: '1000000'
			});
		console.log('合约部署成功：',
			contract.options.address);
  });
  it("deploy contract sucessfully",()=>{
  	assert.ok(contract.options.address);
  });
  it("should have a new brand", async ()=>{
  	const brand = await contract.methods.getBrand().call();
	console.log(brand);
	assert.equal(brand,initialBrand);
  });
  it("should set a new brand",async ()=>{
  	const newBrand = "Audi";
	await contract.methods.setBrand(newBrand)
	  .send({from: accounts[0]});
	const brand = await contract.methods.getBrand().call();
	assert.equal(brand,newBrand);
  });
});
