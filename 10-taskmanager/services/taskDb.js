var fs = require('fs'),
	path = require('path');

var dbFile = path.join(__dirname, '../db/taskData.json');

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

module.exports = {
	read : read,
	write : write
};