'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Promotion = require('../models/promotions');
var Verify = require('./verify');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

var _checkError = function(err){
		if(err){
			throw err;
		}	
};

promoRouter.route('/')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
	Promotion.find({},function(err,promotions){
		_checkError(err);
		res.json(promotions);
	});
})
.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Promotion.create(req.body,function(err,promotion){
		_checkError(err);
		res.json(promotion);
	});
})
.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Promotion.remove({},function(err,removedPromotions){
		_checkError(err);
		res.json(removedPromotions);
	});
})
;
promoRouter.route('/:promoId')
.get(Verify.verifyOrdinaryUser,function(req,res,next){
	console.log(req.params.promoId);
	Promotion.findById(req.params.promoId,function(err,promotion){
		_checkError(err);
		res.json(promotion);
	});
})
.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Promotion.findByIdAndUpdate(req.params.promoId,{
		$set : req.body
	},{
		new : true
	},function(err,updatedPromotion){
		_checkError(err);
		res.json(updatedPromotion);
	});
})
.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
	Promotion.findByIdAndRemove(req.params.promoId,function(err,deletedPromo){
		_checkError(err);
		res.json(deletedPromo);
	});
})
;

module.exports.getRouter = function(){
	return promoRouter;
};

module.exports.getRouterUrl = function(){
	return '/promotions';
};