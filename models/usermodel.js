var mongoose = require('mongoose');
var ai = require('mongoose-auto-increment');
var schema = mongoose.Schema;

var userschema = new schema ({
	username : {
		type : String
	},
	password : {
		type : String
	},
	email : {
		type : String
	},
	joined : {
		type : Date,
		default : Date.now
	},
	level : {
		type : Number,
		default : 1
	}

});

userschema.plugin(ai.plugin,{
	model : 'usermodel',
	field : 'id',
	startAt : 1,
	incrementBy : 1

});

var usermodel = mongoose.model('usermodel',userschema);


module.exports = {
	usermodel : usermodel
}


