'use strict'

var express = require('express');
var app = express();
var port = process.env.PORT || 3030;
var parser = require('body-parser');
var flash = require('express-flash');
var validator = require('express-validator');
var session = require('express-session');
var async = require('async');
app.use(session({
	secret : "hfids98wer93wv624222vccbydaosasffhf",
	resave: false,
  saveUninitialized: true
 } ));
app.use(flash());

app.use(parser.urlencoded({extended : true}));
app.use(validator());

//using db
require('./models/connection')
var urlmodel = require('./models/urlmodel');
var usermodel = require('./models/usermodel')

//using view engine ejs
app.set('view engine','ejs');
app.use(require('./controllers/urlpost'))
app.use(require('./controllers/login'))
app.use(require('./controllers/register'))




function nonlogger(req,res,next){
		if(req.session.username){
			res.redirect('/');
			
		}
	else{
		
		next();
		
		}

}



function logger(req,res,next){
		if(!req.session.username){
			req.flash('msg',['jpt','You must be logged in to continue']);
			res.redirect('/login');

			
		}
	else{
		
		next();
		
		}

}





app.get('/',function(req,res){
	urlmodel.urlmodel.find({addedby:req.session.username}).sort('-date').exec(function(err,succ){
		if(err){res.send(err);}
		else{
		res.render("index",{info : req.flash('info'),user : req.session.username,datas : succ})
		}


	})



	
})



app.get('/delete/:id',logger,function(req,res){
	urlmodel.urlmodel.findOne({short : req.params.id}).exec(function(err,succ){

		if(err){res.send(err);}
		if(succ){
			if(succ.addedby==req.session.username){
				succ.remove();
				req.flash('info',['Removed','success',"Done !! Removed"]);
		res.redirect('/');
			}
			else{
				req.flash('info',['Unauthorised Access','danger',"Permission Denied : Invalid request by unauthorised person"]);
		res.redirect('/');
			}



		}




		else{
			req.flash('info',['Invalid Data','danger',"No such data exists to delete"]);
		res.redirect('/');
		}
	});

})



app.get('/login',nonlogger,function(req,res){
	res.render('login',{msg : req.flash('msg')})
});

//logout
app.get('/logout',function(req,res){
	req.session.destroy();
	res.redirect('/login')
})

//register
app.get('/register',function(req,res){
	res.render('register',{msg : req.flash('msg')})
});


app.get('/:url',function(req,res){
	urlmodel.urlmodel.findOne({short :req.params.url}).exec(function(err,succ){
		if(err){res.send(err)}
		if(succ){
			console.log(succ.url)
			res.redirect(succ.url);
			succ.views+=1;
			succ.save();
			
			
		}
		else{
			req.flash('info',['danger','Invalid Request','Oopss !! The Url doesnot exists']);
			res.redirect('/');
		}
	})
})







app.listen(port,function(){
	console.log("Listening to port "+port)
});
