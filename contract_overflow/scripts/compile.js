const fs = require('fs-extra');
const solc = require('solc');
const path = require('path');

//clean up
compileDir = path.resolve(__dirname,'../compiled');
fs.removeSync(compileDir);
fs.ensureDirSync(compileDir);

//compile
const contractPath = path.resolve(__dirname, '../contract','Coin.sol');
const contractSource = fs.readFileSync(contractPath,'utf-8');
let compileResult = solc.compile(contractSource, 1);

//console.log(compileResult);

// check errors
if (Array.isArray(compileResult.errors) && compileResult.errors.length) {
	throw new Error(compileResult.errors[0]);
}


//save result
Object.keys(compileResult.contracts).forEach(name => {
	const contractName = name.replace(/^:/, '');
	const filePath = path.resolve(__dirname, '../compiled',
		`${contractName}.json`);
	fs.outputJsonSync(filePath, compileResult.contracts[name]);
	console.log(`save compiled contract ${contractName} to 
${filePath}`);
});


