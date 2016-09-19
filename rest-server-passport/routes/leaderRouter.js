'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Leader = require('../models/leadership');
var Verify = require('./verify');


var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

var _checkError = function(err){
		if(err){
			throw err;
		}	
}

leaderRouter.route('/')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
	Leader.find({},function(err,leaders){
		_checkError(err);
		res.json(leaders);
	});
})
.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Leader.create(req.body,function(err,leader){
		_checkError(err);
		res.json(leader);
	});
})
.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Leader.remove({},function(err,resp){
		_checkError(err);
		res.json(resp);
	});
})
;
leaderRouter.route('/:leaderId')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
	Leader.findById(req.params.leaderId,function(err,leader){
		_checkError(err);
		res.json(leader);
	});
})
.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Leader.findByIdAndUpdate(req.params.leaderId,{
		$set : req.body
	},{
		new : true
	},function(err,leader){
		_checkError(err);
		res.json(leader);
	});
})
.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Leader.findByIdAndRemove(req.params.leaderId,function(err,leader){
		_checkError(err);
		res.json(leader);	
	});
})
;

module.exports.getRouter = function(){
	return leaderRouter;
};

module.exports.getRouterUrl = function(){
	return '/leaderships';
};