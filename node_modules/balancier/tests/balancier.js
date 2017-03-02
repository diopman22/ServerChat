'use strict';

var bala = require(__dirname+'/../index.js'),
	assert = require('chai').assert;

describe('balancier#add()', function(){
	it('adds a backend to the list', function(){
		var res = bala.add({
			port: 3000,
			host: 'myhost.com'
		});

		assert.isTrue(res);
		assert.equal(bala._backends.length, 1);
	});
});

describe('balancier#remove()', function(){
	it('removes a backend to the list', function(){
		var res = bala.remove({
			port: 3000,
			host: 'myhost.com'
		});
		
		assert.isTrue(res);
		assert.equal(bala._backends.length, 0);
	});
});

describe('balancier#add()', function(){
	it('adds 2 backends to the list', function(){
		var res = bala.add([
			{
				port: 3000,
				host: 'myhost.com'
			},
			{
				
				port: 3000,
				host: '2.myhost.com'
			}
		]);

		assert.isTrue(res);
		assert.equal(bala._backends.length, 2);
	});
});

describe('balancier#remove()', function(){
	it('removes a backend to the list', function(){
		var res = bala.remove({
			port: 3000,
			host: 'myhost.com'
		});
		
		assert.isTrue(res);
		assert.equal(bala._backends.length, 1);
		assert.equal(bala._backends[0].host, '2.myhost.com');
	});
});

describe('balancier#remove()', function(){
	it('removes a backend to the list', function(){
		var res = bala.remove({
			port: 3000,
			host: '2.myhost.com'
		});
		
		assert.isTrue(res);
		assert.equal(bala._backends.length, 0);
	});
});
