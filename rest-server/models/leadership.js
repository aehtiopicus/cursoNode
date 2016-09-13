var mongoose = require('mongoose');

var mongooseCurrency = require('mongoose-currency');

var Schema = mongoose.Schema;

var leaderSchema = new Schema({
	name: {
		type : String,		
		required : true
	},
	image : {
		type : String,
		required : true,		
	},
	abbr : {
		type : String,
		required : true
	},
	description : {
		type : String,
		required : true
	},
	designation : {
		type : String,
		required : true
	}
},{
	timestamps : true
});


//model creation for Schema
var Leader = mongoose.model('Leader',leaderSchema);

module.exports = Leader;