var chalk = require('chalk');

module.exports = function(req, res, next){
	console.log(chalk.red(req.method) + '\t' + chalk.green(req.pathname));
	next();
}