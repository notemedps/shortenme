var express = require('express');
var router = express.Router();
var usermodel = require('../models/usermodel');
var bcrypt = require('bcryptjs');



function nonlogger(req,res,next){
	if(req.session.username){
		res.redirect('/');
		
	}
else{
	
	next();
	
	}

}


router.post('/login',nonlogger,function(req,res){
var username = req.body.username;
var password = req.body.password;
req.assert('username',"username is empty !!").notEmpty();
req.assert('password',"Password is empty !!").notEmpty();

req.getValidationResult().then(function(result){
			if(!result.isEmpty()){
				req.flash('msg',['main',result.array()]);
				res.redirect('/login');
			//errors on validatins end
			}
			else{
				usermodel.usermodel.findOne({'username':username}).exec(function(err,succ){
					if(err){res.send(err);}

					if(succ){

						if(bcrypt.compareSync(password,succ.password)){
							req.session.username = succ.username;
							res.redirect('/');
						}

						else{
						req.flash('msg',['jpt','Incorrect Password']);
						res.redirect('/login'); 
							}
					//if  some data is fetched end
					}

					else{
						req.flash('msg',['jpt','Username doesnt exists']);
						res.redirect('/login');

					//if no data fetched end
					}

		//finish finding db data
				});
		//no error on validation end
			}
//finish getting result	
})

//post end
});
module.exports = router;