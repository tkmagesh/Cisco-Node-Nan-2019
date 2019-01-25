var fs = require('fs'),
	path = require('path');

var dbFile = path.join(__dirname, '../db/taskData.json');

/*
//using callbacks
function read(callback){
	fs.readFile(dbFile, {encoding : 'utf8'}, function(err, fileContents){
		if (err){
			return callback(err);
		} else {
			var data = JSON.parse(fileContents);
			return callback(null, data);
		}
	});
}

function write(data, callback){
	fs.writeFile(dbFile, JSON.stringify(data), callback);
}
*/

/*
//We create the promise ourselves
function read(){
	return new Promise(function(resolveFn, rejectFn){
		fs.readFile(dbFile, {encoding : 'utf8'}, function(err, fileContents){
			if (err){
				rejectFn(err);
			} else {
				var data = JSON.parse(fileContents);
				resolveFn(data);
			}
		});	
	});
}

function write(data){
	return new Promise(function(resolveFn, rejectFn){
		fs.writeFile(dbFile, JSON.stringify(data), function(err, result){
			if(err){
				rejectFn(err);
			} else {
				resolveFn(result);
			}
		});
	});
	
}
*/


//using util.promisify
/*var util = require('util');

var readFileAsync = util.promisify(fs.readFile),
	writeFileAsync = util.promisify(fs.writeFile);

function read(){
	
	return readFileAsync(dbFile, {encoding : 'utf8'})
		.then(function(fileContents){
			return JSON.parse(fileContents);
		});
}

function write(data){
	return writeFileAsync(dbFile, JSON.stringify(data));
}*/

//Using bluebird
var bluebird = require('bluebird');
bluebird.promisifyAll(fs);

function read(){
	
	return fs.readFileAsync(dbFile, {encoding : 'utf8'})
		.then(function(fileContents){
			return JSON.parse(fileContents);
		});
}

function write(data){
	return fs.writeFileAsync(dbFile, JSON.stringify(data));
}


module.exports = {
	read : read,
	write : write
};