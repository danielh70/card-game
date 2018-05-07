var express = require('express');
var router = express.Router();


// Get Homepage
router.get('/', checkAuth, (req, res) => {
	res.render('index')
});

function checkAuth(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	else {
		req.flash('error_msg', 'fail fail fail')
		res.redirect('/users/login');
	}
}

module.exports = router;