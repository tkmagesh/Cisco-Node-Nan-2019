var express = require('express');
var router = express.Router();

var taskList = [
	{id : 1, name : 'Learn JavaScript', isClosed : false},
	{id : 2, name : 'Explore Bangalore', isClosed : true},
];

router.get('/', function(req, res, next){
	res.json(taskList);
});

router.get('/:id', function(req, res, next){
	var result = taskList.find(function(task){
		return task.id === parseInt(req.params.id);
	});
	if (result){
		res.json(result);
	} else {
		res.status(404).end();
	}
});

router.post('/', function(req, res, next){
	var taskData = req.body;
	taskData.id = taskList.reduce(function(result, task){
		return result > task.id ? result : task.id;
	},0) + 1;
	taskList.push(taskData);
	res.status(201).json(taskData);
});


module.exports = router;