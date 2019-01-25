var taskDb = require('./taskDb');

var taskList = [];

function init(){
	/*taskDb.read(function(err, tasks){
		if (err){
			throw err;
		} else {
			taskList = tasks;
		}
	});*/

	taskDb
		.read()
		.then(function(tasks){
			taskList = tasks;
		});
}

function getAll(){
	return taskList;
}

function get(id){
	return taskList.find(function(task){
		return task.id === parseInt(id);
	});
}

function addNew(taskData){ 
	taskData.id = taskList.reduce(function(result, task){
		return result > task.id ? result : task.id;
	},0) + 1;
	taskList.push(taskData);
	return taskDb
		.write(taskList)
		.then(function(){
			return taskData;
		})
}

function save(id, taskData){
	var taskToUpdate = taskList.find(function(task){
		return task.id === parseInt(id);
	});
	if (!taskToUpdate){
		return Promise.reject(new Error('task not found'));
	}
	Object.assign(taskToUpdate, taskData);
	return taskDb
		.write(taskList)
		.then(function(){
			return taskToUpdate;
		})
}

function remove(id){
	var taskToRemove = taskList.find(function(task){
		return task.id === parseInt(id);
	});
	if (!taskToRemove){
		return Promise.reject(new Error('task not found'));
	}
	taskList = taskList.filter(function(task){
		return task.id !== parseInt(id);
	});
	return taskDb.write(taskList);
}

module.exports = {
	init : init,
	get: get,
	getAll : getAll,
	save : save,
	addNew : addNew,
	remove : remove
};