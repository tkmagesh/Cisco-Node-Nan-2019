var url = require('url');

module.exports = function(req){
	var parsedUrl = url.parse(req.url);
	Object.assign(req, parsedUrl);
}


