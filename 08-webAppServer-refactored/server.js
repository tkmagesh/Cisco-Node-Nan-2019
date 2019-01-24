
var http = require('http');
	
var dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	serveCalculator = require('./serveCalculator'),
	notFoundHandler = require('./notFoundHandler'),
	app = require('./app');

app.use(dataParser);
app.use(serveStatic);
app.use(serveCalculator);
app.use(notFoundHandler);

var server = http.createServer(app);

server.listen(8080);

server.on('listening', function(){
	console.log('server running on port 8080..!');
});

console.log('server started...');
