var fs = require('fs');

var stream = fs.createReadStream('./sample.txt', {encoding : 'utf8'});

//events -> open, data, end, close, error
/*var counter = 0;

stream.on('data', function(chunk){
	++counter;
	console.log(chunk);
});

stream.on('end', function(){
	console.log('Thats all folks!!');
	console.log('readCount = ', counter);
});

stream.on('error', function(err){
	console.log('something went wrong!');
	console.log(err);
});*/

stream.pipe(process.stdout);