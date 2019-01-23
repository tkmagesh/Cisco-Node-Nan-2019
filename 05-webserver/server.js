var http = require('http'),
	fs = require('fs'),
	path = require('path');

var server = http.createServer(function(req /* Readable Stream */, res /* Writable Stream*/){
	console.log('a connection is established - ', req.url );
	var resourceName = req.url === '/' ? '/index.html' : req.url;
	var resourceFullName = path.join(__dirname, resourceName);
	if (!fs.existsSync(resourceFullName)){
		res.statusCode = 404;
		res.end();
		console.log('file not found - ', resourceFullName);
		return;
	}
	var stream = fs.createReadStream(resourceFullName);
	stream.pipe(res);
});

server.listen(8080);

server.on('listening', function(){
	console.log('server running on port 8080..!');
});

console.log('server started...');