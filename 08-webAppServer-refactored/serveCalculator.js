var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res){
	if (req.pathname === '/calculator'){
		if (req.method === "GET"){
			var queryData = querystring.parse(req.query),
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
	}
}