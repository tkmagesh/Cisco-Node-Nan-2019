var express = require('express');
var router = express.Router();
var taskService = require('../services/taskService');

taskService.init();

router.get('/', function(req, res, next){
	var tasks = taskService.getAll();
	res.json(tasks);
});

router.get('/:id', function(req, res, next){
	var result = taskService.get(req.params.id);
	if (result){
		res.json(result);
	} else {
		res.status(404).end();
	}
});

router.post('/', function(req, res, next){
	var taskData = req.body;
	taskService.addNew(taskData, function(err, newTask){
		if (err){
			res.status(500).end();
		} else {
			res.status(201).json(newTask);		
		}
	});
	
});

router.put('/:id', function(req, res, next){
	try{
		var updatedTask = taskService.save(parseInt(req.params.id), req.body);
		res.json(updatedTask)
	} catch (err){
		res.status(404).end();
	}
	
});


router.delete('/:id', function(req, res, next){
	try{
		var result = taskService.remove(req.params.id);
		res.json(result);
	} catch (err){
		res.status(404).end();	
	}
});


module.exports = router;