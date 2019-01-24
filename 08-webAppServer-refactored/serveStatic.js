var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.js', '.css', '.jpg', '.ico', '.gif', '.xml', '.json', '.txt'];

function isStatic(resourceName){
	var resExtn = path.extname(resourceName);
	return staticExtns.indexOf(resExtn) >= 0;
}

module.exports = function(req, res){
	var resourceName = req.pathname === '/' ? '/index.html' : req.pathname;

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
	}
}