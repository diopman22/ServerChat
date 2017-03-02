## Balancier

It's got a french name.

Balancier is a round robin load balancer middleware for [node-http-proxy](https://github.com/nodejitsu/node-http-proxy). I did not build this with it being intended for use in production. I built this for a project that did not require WebSockets, so it doesn't support WebSockets per http-proxy's needs.

### Example

```javascript
var httpProxy = require('http-proxy'),
	balancier = require('balancier');

/**
 *	Give the proxy something to start with
 */
balancier.add([
	{
		host: '127.0.0.1',
		port: 3000
	},
	{
		host: '127.0.0.1',
		port: 3001
	}
]);

/**
 *	Create our proxy
 *	Pass in our middleware for balancier
 */
var server = httpProxy.createServer(balancier.middleware, options);

server.listen(8000);

```

### Adding and removing servers

```javascript
/**
 *	Add servers
 *	You can pass in one server or an array of servers
 *	Servers will not be added unless they has a `host` and a `port`
 */
var result = balancier.add({
	host: '127.0.0.1',
	port: 3002
});

console.log(result); // true if the server was removed successfully

/**
 *	Remove servers
 */
balancier.remove({
	host: '127.0.0.1',
	port: 3002
});

console.log(result); // true if the server was removed successfully

/**
 *	See all servers
 */
var servers = balancier.getBackends();
console.log(servers); // [ { server1 }, { serverN } ]
```

## Running tests

`$ npm test`

The tests require [mocha](https://github.com/visionmdedia/mocha).

## License

(The MIT License)

Copyright (c) 2013 TJ Krusinski &lt;tj@shoflo.tv&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
