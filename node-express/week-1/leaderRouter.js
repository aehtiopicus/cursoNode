'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all(function(req,res,next){	
	res.writeHead(200,{'Content-Type':'text/plain'});
	next();
})
.get(function(req,res,next){
	res.end('Will show all our leaders to you!');
})
.post(function(req,res,next){
	console.log('b');
	res.end('Will add the leader: '+req.body.name+' with details: '+req.body.description);
})
.delete(function(req,res,next){
	res.end('Deleting all leaders');
})
;
leaderRouter.route('/:leaderId')
.all(function(req,res,next){
	
	res.writeHead(200,{'Content-Type':'text/plain'});
	next('route');
})
.get(function(req,res,next){
	res.end('Will send details of the dish: '+req.params.leaderId+' to you!');	
})
.put(function(req,res,next){
	res.write('Updating the leader: ' + req.params.leaderId + '\n');
	res.end('Will update the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete(function(req,res,next){
	res.end('Deleting leader: '+req.params.leaderId);
})
;

module.exports.getRouter = function(){
	return leaderRouter;
};

module.exports.getRouterUrl = function(){
	return '/leaderships';
};