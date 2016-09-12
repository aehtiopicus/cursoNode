var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dishSchema = new Schema({
	name : {
		type: String,
		require : true,
		unique : true,
	},
	description : {
		type : String,
		require : true
	}
},{
	timestamps : true
});

//model creation for Schema
var Dishes = mongoose.model('Dish',dishSchema);

module.exports = Dishes;