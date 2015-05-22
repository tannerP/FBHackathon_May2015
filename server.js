//server.js

//BASE SETUP
//================================================


//CALL THE PACKAGES-------------------------------

var jwt = require('jsonwebtoken');//TOKEN Package
var express = require ('express'); //EXPRESS Package
var app = express();	//define our app using express
var bodyParser = require('body-parser');// get body-parser
var morgan = require('morgan'); //use to see requests
var mongoose = require('mongoose'); //for working with database
var config = require('./config'); //get config file
var path = require('path');
var port = config.port; //PORT


//secret
//---------------
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

//log all requests to the console
app.use(morgan('dev'));

// connect to our databse(hosted on modules.io)
mongoose.connect(config.database);

//set static files location
//used for requests that frontend will make
app.use(express.static(__dirname + '/public'));

//ROUTES FOR API
//=================================

//API ROUTES -----------------------------------
var apiRoutes = require('./server/routes/api')(app,express);
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


//START THE SERVER
//========================================================
app.listen(config.port);
console.log("Magic happens on port" + config.port);