var mongoose = require('mongoose');

var mongooseCurrency = require('mongoose-currency');
require('mongoose-currency').loadType(mongoose);

var Currency = mongoose.Types.Currency;

var Schema = mongoose.Schema;

var promotionSchema = new Schema({
	name: {
		type : String,		
		required : true
	},
	image : {
		type : String,
		required : true,		
	},
	label : {
		type : String,
		default : ''
	},
	price : {
		type : Currency,
		required : true
	},
	description : {
		type : String,
		required : true
	}
},{
	timestamps : true
});


//model creation for Schema
var Promotion = mongoose.model('Promotion',promotionSchema);

module.exports = Promotion;