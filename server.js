//server.js
//===========================--BASE SETUP--====================
//LOAD PACKAGES-------------------------------
//var jwt = require('jsonwebtoken');//TOKEN Package
var express = require ('express'); //EXPRESS Package
var app = express();	//define our app using express
var bodyParser = require('body-parser');// get body-parser
var morgan = require('morgan'); //use to see requests
var mongoose = require('mongoose') //for working with mongoDB
var config = require('./config'); //get config file
var path = require('path');
//var port = config.port; //PORT
//var mongodb = require('mongodb'); //for working with database


app.use(morgan('dev')); //HTTP logger


//=========================--APP--============================
var superSecret = config.secret;
// APP CONFIGURATION----------------------------------
//use body parser so we can grab information from POST
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

//configure app to handle CORS requests
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Orgin','*');
	res.setHeader('Access-Control-Allow-Method','GET,POST');
	res.setHeader('Access-Control-Allow-Headers','X-Request-With,content-type,\Authorization');
	next();
});

//===========================--DB--============================
// connect to our databse(hosted on modules.io)
//mongoose.connect(config.database); 
mongoose.connect('mongodb://localhost/local');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('MONGO: successfully connected to db');
});
/*var MongoClient = mongodb.MongoClient, format =require('util').format;

MongoClient.connect('mongodb://54.218.25.235:27017/actors', function(err,db){
	if(err){
		throw err;
	}
	else{
		console.log("successfully connected to the database");
	}
	db.close();
});
*/

//set static files location
//used for requests that frontend will make
app.use(express.static(__dirname + '/public'));

//=========================--ROUTES/API--====================================
//API ROUTES 
var apiRoutes = require(__dirname + '/server/routes/api')(app,express);
//REGISTER ROUTES----------------------------------------
//all of our routes will be prefixed with /api
app.use('/api',apiRoutes);

//MAIN CATCHALL ROUTE---------------------------
//SEND USERS TO FRONTEND -----------------------
//has to be registered after API ROUTES

// set up our one route to the index.html file
//route for the home page
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//=========================--START THE SERVER---=========================
app.listen(config.port);
console.log("Magic happens on port" + config.port);




