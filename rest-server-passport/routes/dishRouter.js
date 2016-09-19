'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var _dish = require('../models/dishes');
var Dishes = _dish.Dishes;
var Comments = _dish.Comments;

var Verify = require('./verify');

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

var _checkError = function(err){
		if(err){
			throw err;
		}
	
}
dishRouter.route('/')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
	Dishes.find({},function(err,dish){
		_checkError(err);
		//set response to 200 and Content-Type to application/json
		res.json(dish);
	});
})
.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	//bodyParser convers to proper json so body is a dish
	console.log(req.body);
	Dishes.create(req.body,function(err,dish){
		_checkError(err);
		console.log('Dish created!');
		res.writeHead(200,{'Content-Type': 'text/plain'})
		res.end('Added the dish with id '+dish._id);
	});
	
})
.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Dishes.remove({},function(err,resp){
		_checkError(err);
		res.json(resp);
	});
});

dishRouter.route('/:dishId')

.get(Verify.verifyOrdinaryUser,function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,dish){
		_checkError(err);
		res.json(dish);
	});
})
.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Dishes.findByIdAndUpdate(req.params.dishId,{
		$set : req.body
	},{
		//callback return the value
		new : true		
	}, function(err,dish){
		_checkError(err);
		res.json(dish);
	});
})
.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Dishes.findByIdAndRemove(req.params.dishId,function(err,resp){
		_checkError(err);
		res.json(resp);		
	});
})
;

dishRouter.route('/:dishId/comments')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,dish){
		_checkError(err);
		res.json(dish.comments);
	});
})
.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,dish){
		_checkError(err);		
		dish.comments.push(req.body);
		dish.save(function(err,dish){
			_checkError(err);
			console.log('Updated comments');
			console.log(dish);
			res.json(dish);

		});
	});		
})
.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,dish){
		_checkError(err);
		for(var i = dish.comments.length -1; i >=0 ;i--){
			dish.comments.id(dish.comments[i]._id).remove();			

		}
		dish.comments.save(function(err,result){
			_checkError(err);
			res.writeHead(200,{'Content-Type': 'text/plain'})
		    res.end('All comments deleted');
		});

	});
});

dishRouter.route('/:dishId/comments/:commentsId')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,dish){
		_checkError(err);
		res.json(dish.comments.id(req.params.commentsId));
	});
})
.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,dish){
		_checkError(err);
		
		dish.comments.id(req.params.commentsId).remove();
		dish.comments.push(req.body);
		dish.save(function(err,updated){
			_checkError(err);
			res.json(updated);
		});
	});
})
.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Dishes.findById(req.params.dishId,function(err,dish){
		_checkError(err);
		dish.comments.id(req.params.commentsId).remove();
		dish.save(function(err,updated){
			_checkError(err);
			res.json(updated);
		});

	});
})
;

module.exports.getRouter = function(){
	return dishRouter;
};

module.exports.getRouterUrl = function(){
	return '/dishes';
};