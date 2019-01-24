var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var server = http.createServer(function(req /* Readable Stream */, res /* Writable Stream*/){
	
	var resource = req.url,
	 	parsedUrl = url.parse(resource),
	 	resourceName = parsedUrl.pathname;
	 	
	console.log(req.method + '\t' + resourceName);
	
	if (resourceName !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	if (req.method === "GET"){
		var queryData = querystring.parse(parsedUrl.query),
			op = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2);
		var result = calculator[op](n1,n2);
		res.write(result.toString());
		res.end();
	} else {
		var rawBodyData = '';
		req.on('data', function(chunk){
			rawBodyData += chunk;
		});
		req.on('end', function(){
			var bodyData = querystring.parse(rawBodyData),
				op = bodyData.op,
				n1 = parseInt(bodyData.n1),
				n2 = parseInt(bodyData.n2);
			var result = calculator[op](n1,n2);
			res.write(result.toString());
			res.end();
		});
	}
});

server.listen(8085);

server.on('listening', function(){
	console.log('server running on port 8085..!');
});

console.log('server started...');