var fs = require('fs');

fs.readFile('./sample.txt', {encoding : 'utf8'}, function(err, fileContents){
	if (err){
		console.log(err);
		return;
	}
	console.log(fileContents);
});

