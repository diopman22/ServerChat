'use strict';

var balancier = {
	_backends: [],
};

/**
 *	Middleware
 *	@method middleware
 *	@param {Object} req
 *	@param {Object} res
 *	@param {Object} proxy
 */
balancier.middleware = function(req, res, proxy) {
	var backend = this._backends.shift();
	proxy.proxyRequest(req, res, backend);
	this._backends.push(backend);
};

/**
 *	Set backends
 *	@method add
 *	@param {Object|Array} backends
 *	@return {Boolean} optomistic success
 */
balancier.add = function(backends) {
	if (backends instanceof Array) return !!backends.map(this.add, balancier);
	if (!backends.port || !backends.host) return false;
	this._backends.push(backends);
	return true;
};

/**
 *	Remove backend
 *	@method remove
 *	@param {Object} backend
 *	@return {Boolean} optomistic success
 */
balancier.remove = function(backend) {
	if (!backend.port || !backend.host) return false;
	var index = -1;

	this._backends.forEach(function(el, i){
		if (el.port == backend.port &&
			el.host == backend.host) {
			index = i;
		};
	});

	if (!~index) return false;
	return !!this._backends.splice(index, 1).length;
};

/**
 *	Get backends
 *	@method get
 *	@return {Array}
 */
balancier.getBackends = balancier.getBackend = function() {
	return this._backends;
};

module.exports = balancier;
