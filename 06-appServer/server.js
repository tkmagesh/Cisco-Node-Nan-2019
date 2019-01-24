var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var server = http.createServer(function(req /* Readable Stream */, res /* Writable Stream*/){
	console.log('a connection is established - ', req.url );
	
	var resource = req.url,
	 	parsedUrl = url.parse(resource),
	 	resourceName = parsedUrl.pathname,
	 	queryData = querystring.parse(parsedUrl.query);
	 	
	if (resourceName !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	var op = queryData.op,
		n1 = parseInt(queryData.n1),
		n2 = parseInt(queryData.n2);
	var result = calculator[op](n1,n2);
	res.write(result.toString());
	res.end();
});

server.listen(8085);

server.on('listening', function(){
	console.log('server running on port 8085..!');
});

console.log('server started...');