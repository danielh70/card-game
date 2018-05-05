var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', (req, res) => {
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://localhost:27017/card-games';

	MongoClient.connect(url, (err, db) => {
		if (err) {
			console.log('Unable to connect to the server', err);
		}
		else {
			console.log('Connection Success');

			var collection = db.collection('users');

			collection.find({ username: 'daniel' }).toArray((err, result) => {
				if (err) {
					res.send(err);
				}
				else if (result.length) {
					console.log(result);

					res.send(result[0])
				}
				else {
					res.send('No documents found');
				}
				db.close();
			});
		}
	})
})

module.exports = router;
