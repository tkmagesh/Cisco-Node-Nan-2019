var url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	var parsedUrl = url.parse(req.url);
	Object.assign(req, parsedUrl);
	req.query = querystring.parse(req.query);
	var rawBodyData = '';
	req.on('data', function(chunk){
		rawBodyData += chunk;
	});
	req.on('end', function(){
		req['body'] = querystring.parse(rawBodyData);
		next();
	});
}


