var url = require('url');

module.exports = function(req, res, next){
	var parsedUrl = url.parse(req.url);
	Object.assign(req, parsedUrl);
	next();
}


