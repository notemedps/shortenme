var mongoose = require('mongoose');
var ai = require('mongoose-auto-increment');
var schema = mongoose.Schema;
var urlschema = new schema({
	url : {type : String},
	short : {type : String},
	addedby : {type : String},
	date : {type : Date, default : Date.now},
	views : {type : Number,default : 0}

});
var urlmodel = mongoose.model('urlmodel',urlschema);
module.exports = {
	urlmodel:urlmodel
}