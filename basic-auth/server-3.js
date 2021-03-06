'use strict';

var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var hostname = 'localhost';
var port = '3000';

var app = express();
//dev preformated log
app.use(morgan('dev'));
app.use(session({
	name : 'session-id',
	secret : '12345-67890-09876-54321',
	saveUninitialized:true,
	resave : true,
	store : new FileStore()
}));


var _auth = function (req,res,next){
	console.log(req.headers);

	if(!req.session.user){
		var authHeader = req.headers.authorization;
		if(!authHeader){
			var err = new Error('Your are not authenticated!!');
			err.status = 401;
			next(err);
			return;
		}else{

			//convert base64 to string
			var auth = new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');
			var user = auth[0];
			var pass = auth[1];
			if(user === 'admin' && pass === 'password'){
				req.session.user = 'admin';
				next();
			}else{
				var err = new Error('You are not authenticated!');
				err.status = 401;
				next(err);
			}
		}
	}else{
		if (req.session.user !== 'admin'){
			var err = new Error('You are not authenticated!');
			err.status = 401;
			next(err);
		}else{
			console.log('req.session',req.session);
			next();
		}
	}
};

app.use(_auth);
//__filename ->fullpath file
//__dirname ->fullpath directory
app.use(express.static(__dirname+'/public'));

app.use(function(err,req,res,next){
	res.writeHead(err.status || 500,{
		'WWW-Authenticate': 'Basic',
		'Content-Type': 'text/plan'
	});
	res.end(err.message);
});
app.listen(port,hostname,function(){
	console.log('Server running at http://'+hostname+':'+port+'/');
});