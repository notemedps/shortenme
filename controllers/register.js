var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var usermodel = require('../models/usermodel');
//post req
router.post('/register',function(req,res){

	var username = req.body.username;
	var password = req.body.password;
	var rpassword = req.body.rpassword;
	var email = req.body.email;

	var hashed = bcrypt.hashSync(password,8);

	req.assert('username','Username is Empty').notEmpty();
	req.assert('password','Password is Empty').notEmpty();
	req.assert('rpassword','Repeat Password is Empty').notEmpty();
	req.assert('email','Email is Empty').notEmpty();
	req.assert('username',"Username can be only alphabets").isAlpha();
	req.assert('password',' Two passwords donot match').equals(rpassword);
	req.assert('username','Username must be of 6 to 20 characteres').len(6,20);
	req.assert('password','password must be of 6 to 120 characteres').len(6,120);
	req.assert('email','Invalid Email address').isEmail();

//if validation error
	req.getValidationResult().then(function(result){
		if(!result.isEmpty()){
			req.flash('msg', ['main',result.array()]);
			res.redirect('/register');
		}

		else{

//no express-validator's error , now checking databse related issues		
	
	usermodel.usermodel.findOne(   {  $or:[ {'username':username} , {'email':email} ]}  ).exec(function(err,succ){
		if(err){

			res.send(err);
					}
		if(succ){
			req.flash('msg',['non','Oopsiee !! The username or email is alredy taken']);
			res.redirect('/register')

		}
		else{
		var data = usermodel.usermodel({
					username : username,
					password : hashed,
					email : email,
					date : Date.now()
				});

			data.save(function(err){
								if(err){ res.send(err);}
								else{
									req.flash('msg',['non','Successfully registered !! Now you can login']);
									res.redirect('/register')
								}
						//data save end
								});
// no email or uname exist end
}

//chk username and email end
	});

//no validation err end
		}

//validation rslt end
	});
//post req end
});
module.exports = router;