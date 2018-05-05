var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



// router.get('/newuser', (req, res) => {
// 	res.render('newuser', { })
// })

module.exports = router;
