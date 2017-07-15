var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ai = require('mongoose-auto-increment');
var connect = mongoose.connect('mongodb://noteme:n0teme@ds159662.mlab.com:59662/shortenme',{useMongoClient : true});
mongoose.connection.once('open',function(){
	console.log("Connection to database has been established");
}).on('error',function(err){
	console.log("Connection to the database couldnot be esatablished . "+err);
});
ai.initialize(mongoose.connection);
