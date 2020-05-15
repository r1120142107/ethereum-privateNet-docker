const assert = require('assert');
const sum = require('../sum.js');

describe('#sum.js',()=>{
        describe("#sum()",()=>{
                it("it sum should return 0",()=>{
                assert.strictEqual(sum(),0);
                });
                it("it sum should return 1",()=>{
                assert.strictEqual(sum(1),1);
                });
        });
});

