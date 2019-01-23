var fs = require('fs');

var fileContents = fs.readFileSync('./sample.txt', {encoding : 'utf8'});

console.log(fileContents);