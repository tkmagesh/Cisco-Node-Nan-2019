
var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticExtns = ['.html', '.js', '.css', '.jpg', '.ico', '.gif', '.xml', '.json', '.txt'];
function isStatic(resourceName){
	var resExtn = path.extname(resourceName);
	return staticExtns.indexOf(resExtn) >= 0;
}

var server = http.createServer(function(req /* Readable Stream */, res /* Writable Stream*/){
	
	var resource = req.url === '/' ? '/index.html' : req.url,
	 	parsedUrl = url.parse(resource),
	 	resourceName = parsedUrl.pathname;

	//logging
	console.log(req.method + '\t' + resourceName);
	
	//serving requests for static resources
	if (isStatic(resourceName)){
		var resourceFullName = path.join(__dirname, resourceName);
		if (!fs.existsSync(resourceFullName)){
			res.statusCode = 404;
			res.end();
			console.log('file not found - ', resourceFullName);
			return;
		}
		var stream = fs.createReadStream(resourceFullName);
		stream.pipe(res);
		return;
	} else if (resourceName === '/calculator'){ /* serving requests for calculator*/
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
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);

server.on('listening', function(){
	console.log('server running on port 8080..!');
});

console.log('server started...');
