'use strict';

var express = require('express');
var morgan = require('morgan');

var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');

var hostname = 'localhost';
var port = '3000';


var app = express();
//dev preformated log
app.use(morgan('dev'));

//attach router to express app
app.use(dishRouter.getRouterUrl(),dishRouter.getRouter());
app.use(promoRouter.promoRouterUrl,promoRouter.promoRouter);
app.use(leaderRouter.getRouterUrl(),leaderRouter.getRouter());

//__filename ->fullpath file
//__dirname ->fullpath directory
app.use(express.static(__dirname+'/public'));

app.listen(port,hostname,function(){
	console.log('Server running at http://'+hostname+':'+port+'/');
});