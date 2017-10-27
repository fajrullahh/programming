var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var router = express.Router();

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//connection database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'learn'
});

connection.connect(function (err){
	if (err) throw err; 
		console.log('Database connected . . . \n\n');
	
});

router.get('/', function(req, res, next) {
  var sql = 'SELECT * FROM `test`';
  	connection.query(sql, function(err, rows, field){
  		if (err) throw err; 
  		res.render('index', {
  			h1: 'CRUD MYSQL using EXPRESS template HBS',
  			data: rows
  		})
  		// console.log(rows[o]);
  	});
});

router.get('/add', function (req, res, next){
	res.render('add_costumer', {title: 'Add'});
});

router.post('/add', function (req, res){

	var input = req.body;

	var data = {

		name : input.name,
		email : input.email,
		number_phone : input.number_phone
	};

	connection.query('INSERT INTO `test` SET ?', data, function (err, rows){

		if(err) throw err;

			res.redirect('/');
	});

});

router.get('/update/:id', function (req, res, next){

	var tid = req.params.id;

	connection.query('SELECT * FROM `test` WHERE id = ?',[tid], function (err, rows){
		if (!err ) {
			var row = rows[0];
		console.log(row);

		res.render('update', {
			judul: 'Update data',
			data : row
		});

		}
	});

});

router.post('/update/:id', function (req, res, next){
	var input = req.body;
	var tid = req.params.id;

	var data = {
		name : input.name,
		email : input.email,
		number_phone : input.number_phone
	};

	connection.query('UPDATE `test` SET ? WHERE id = ?', [data, tid], function (err, rows){
		if (err) throw err;
			res.redirect('/');
	});
});

router.get('/delete/:id', function (req,res, next){
	var id = req.params.id;

	connection.query('DELETE FROM `test` WHERE id = ?',[id], function (err, rows){
		if (err) throw err;
			console.log('deleted success... \n\n');
			res.redirect('/');
	});
});

module.exports = router;
