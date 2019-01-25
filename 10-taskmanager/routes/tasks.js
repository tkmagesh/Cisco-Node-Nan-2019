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
	taskService
		.addNew(taskData)
		.then(function(newTask){
			res.status(201).json(newTask);
		})
		.catch(function(err){
			res.status(500).end();
		});	
});

router.put('/:id', function(req, res, next){
	taskService
		.save(parseInt(req.params.id), req.body)
		.then(function(updatedTask){
			res.json(updatedTask)
		})
		.catch(function(err){
			res.status(404).end();	
		});
	
});


router.delete('/:id', function(req, res, next){
	taskService
		.remove(req.params.id)
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			res.status(404).end();		
		});
});


module.exports = router;