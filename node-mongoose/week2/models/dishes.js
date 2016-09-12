var mongoose = require('mongoose');

var mongooseCurrency = require('mongoose-currency');
require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;

var Schema = mongoose.Schema;

var commentSchema = new Schema({
	rating: {
		type : Number,
		min : 1,
		max : 5,
		required : true
	},
	comment : {
		type : String,
		required : true,		
	},
	author : {
		type : String,
		required : true
	}
},{
	timestamps : true
});

var dishSchema = new Schema({
	name : {
		type: String,
		required : true,
		unique : true,
	},
	description : {
		type : String,
		required : true
	},
	category : {
		type : String,
		required : true
	},
	label : {
		type : String,
		default : ''
	},
	price : {
		type : Currency,
		required : true
	},
	image : {
		type : String,
		required : true
	},
	comments : [commentSchema]
},{
	timestamps : true
});

//model creation for Schema
var Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;