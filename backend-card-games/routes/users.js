var express = require('express');
var router = express.Router();

var User = require('../models/user');

// Get Homepage
router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', (req, res) => {
	const { name, email, username, password, password2 } = req.body

	console.log(name);

	//validation

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		

		var newUser = new User({
			password: password,
			email: email,
			username: username,
			name: name
		});

		User.createUser(newUser, function(err, user) {
			if (err) throw err;
			console.log(user);
		})
		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
		console.log('PASSED');
	}
});

router.get('/login', (req, res) => {
	res.render('login');
});



module.exports = router;