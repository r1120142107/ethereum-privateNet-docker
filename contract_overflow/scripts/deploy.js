const path = require('path');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers
    .HttpProvider('http://localhost:8545'));
// 1. 拿到 abi 和 bytecode 
const contractPath = path.resolve(__dirname,
    '../compiled/Coin.json');
const {
    interface,
    bytecode
} = require(contractPath);
(async () => {
    // 2. 获取钱包里面的账户
    const accounts = await web3.eth.getAccounts();
    console.log('部署合约的账户：', accounts[1]);
    // 3. 创建合约实例并且部署
    console.time('deploy_time')
    var result = await new
        web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: '0x'+bytecode,
            arguments: [20000]
        })
        .send({
            from: accounts[1],
            gas: '1000000',
            Passphrase: '123456'

        });
    console.timeEnd('deploy_time')
    console.log('constract address：', result.options.address);
})();
