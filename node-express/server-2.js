'use strict';

var express = require('express');
var http = require('http');
var morgan = require('morgan');

var hostname = 'localhost';
var port = '3000';

var app = express();
//dev preformated log
app.use(morgan('dev'));
//__filename ->fullpath file
//__dirname ->fullpath directory
app.use(express.static(__dirname+'/public'));

app.listen(port,hostname,function(){
	console.log('Server running at http://'+hostname+':'+port+'/');
});