var express = require('express');
var router = express.Router();
var urlmodel = require('../models/urlmodel');
var vurl = require("valid-url");

router.post('/urlpost',function(req,res){

	var urls = req.body.url;
	var user = req.session.username || 'noteme';	
	if(vurl.isUri(urls) && urls!=''){

		var datex = new Date();
		var short = Math.random().toString(36).slice(5);
		var data = new urlmodel.urlmodel({
			url : urls,
			addedby : user,
			short : short,
			date : datex
		});
		data.save(function(err){
			if(err){res.send(err);}
			else{
				
				req.flash('info',['Your Url has been shorted','success',`Done !! Your Url has been shorted ]! Go through this link : 
					http://localhost:3030/`+short]);
				res.redirect('/')
			}
		})




	}
	else{
		req.flash('info',['Invalid Url','danger',"Please provide  Valid Url"]);
		res.redirect('/');
	}

	






});


module.exports = router;