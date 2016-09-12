var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leaders = require('./models/leadership');

var url = "mongodb://localhost:27017/conFusion";

mongoose.connect(url);
var db = mongoose.connection;


var _closeDB = function(){
		db.close();
	};
	var _creation = {'d':{name :'dishes', ready :false},'p':{name :'promotions', ready :false},'l':{name :'leaders', ready :false}};

	var _readyToClose = function(_creationState,caller){			
		db.collection(_creation[_creationState].name).drop(function(){
			console.log(_creationState+'*************----->'+JSON.stringify(arguments));
			_creation[_creationState].ready = true;			
			var _stopDB = true;
			for (key in _creation){
				if(!_creation[key].ready){
					_stopDB = false;
				}
			}
			if(_stopDB){				
				_closeDB();
			}
		});		
};
db.on('error',console.error.bind(console,'connection error'));

db.once('open',function(){
	console.log('Connected correctly to server');

	

	Dishes.create({
		name : 'Uthapizza',
		description : 'A unique . . .',
		image : 'images/uthapizza.png',
		category : 'mains',
		
		price : '4.99',
		comments : [
			{
				rating : 3,
				comment : 'This is insane',
				author : 'Matt Daemon'
			}
		]
	},function(err,dish){
		if(err){
			throw err;
		}

		console.log('Dish created!');
		console.log(dish);
		var id = dish._id;
		setTimeout(function(){
		_readyToClose('d','dishes');
	},3000);
	});

	Promotions.create({
		name : 'Weekend Grand Buffet',
		description : 'Featuring . . .',
		image : 'images/uthapizza.png',
		label : 'New',
		price : '19.99'

	},function(err,promo){
		if(err){
			throw err;
		}

		console.log('Promotion created!');
		console.log(promo);
		var id = promo._id;
		_readyToClose('p','promo');
	});

	Leaders.create({
		name : 'Uthapizza',
		description : 'Our CEO, Peter, . . .',
		image : 'images/alberto.png',
		designation : 'Chief Epicurious Officer',
		abbr : 'Our CEO, Peter, . . .'
	},function(err,leader){
		if(err){
			throw err;
		}

		console.log('Leader created!');
		console.log(leader);
		var id = leader._id;
		_readyToClose('l','leader');
	});


});