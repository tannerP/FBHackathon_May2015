/* get the things we need
var express = require ('express');
var app     = express();
var path    = require('path');
*/
//CALL THE PACKAGES-------------------------------
var config = require('./config');
// var jwt = require('jsonwebtoken');
// var User = require('./app/models/user');
var express = require ('express'); //call express
var app = express();	//define our app using express
var bodyParser = require('body-parser');// get body-parser
var morgan = require('morgan'); //use to see requests
var mongoose = require('mongoose'); //for working with database
var port = process.env.PORT || 8080; //set port
var path    = require('path');
var superSecret = config.secret;

var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);



//connect to db
mongoose.connect(config.database);

//basic route for the home page

//API ROUTES-----------------------------
var apiRoutes = require('./app/route/api')(app,express);
app.use('/',apiRoutes);

app.get('/',function(req,res)
{
	res.sendFile(path.join(__dirname + '/public/index.html'));
	//res.send('Welcome to the home page');
});

// set the public folder to serve public asssets
app.use(express.static(__dirname + '/public'));

var staticPages = express.Router();

staticPages.route('/signin')

.get(function(req,res){
	 res.sendFile(path.join(__dirname + '/signin'));
	//app.use(express.static(__dirname + '/public/views/pages/signin'));

});

/*
// set up our one route to the index.html file
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});
app.use('/',staticPages);
*/

//port 8080
app.listen(config.port);
console.log('Magic happens on port 8080');
