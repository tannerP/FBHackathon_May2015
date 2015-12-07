/* Express Routes */
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../../config');

//super secret for creating token
var superSecret = config.secret;

module.exports = function(app,express){

//get an instance of the express router
var apiRouter = express.Router();

//===============================  /authenticate  =========================
apiRouter.post('/authenticate',function(req, res){
	//find the user
	//select the name, username and password explicitly
	User.findOne({
		username: req.body.username
	}).select('name username password').exec(function(err,user){
		if(err) throw err;

		//no user with that username was found
		if(!user){
			res.json({
				success:false,
				message:'Authencation failed. User not found.'
			});
		}else if (user){
			//check if password matches
			var validPassword = user.comparePassword(req.body.password);
			if(!validPassword){
				res.json({
					success: false,
					message: 'Authencation failed. Wrong password.'
				});
			}else{
				//if user is found and password is right
				//create a token
				var token = jwt.sign({
					name: user.name,
					username: user.username
				}, superSecret , {
					expiresIn: 86400 //  (24hrs)
					// expires in 3600 * 24 = c (24 hours)
				});
			//return the information including token as JSON
			res.json({
				name: user.name,
				success: true,
				message: 'Enjoy your token!',
				token: token
			});
			}
		}
	});
});

//=================================  /register  =============================
	apiRouter.route('/register')
	//create a user (accessed at POST http://localhost:8080/api/users)
	.post(function(req,res) {
			//create a new instance of the User model
			var user = new User();

			//set the users information (comes from the request)
			user.name = req.body.name;
			user.username = req.body.username;
			user.password = req.body.password;

			//save the user and check for errors
			user.save(function(err){
				if (err){
					//duplicate entry
					if(err.code == 11000)
						return res.json({success: false,
						 message: 'A user with that\ username already exists.'});
					else
						return res.send(err);
				}
				res.json({ message:'User created!' });
			});
});

//===============================  Token Middleware  =========================
// For /users request
// Checks for token
apiRouter.use("/users",function(req,res,next){
	//check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') ||req.headers['x-access-token'];

	//decode token
	if(token){
		//verifies secret and checks exp
		jwt.verify(token,superSecret,function(err,decoded){
			if(err){
				return res.status(403).send({
					success: false,
					message: 'Failed to authenticate token.'
				});
			}else{
				//if everything is good, save to request for use in other routes
				req.decoded = decoded;

				next();// this make sure we go to the next routes and dont stop here
			}
		});
	}else{
		// if there is no token
		//return an HTTP response of 403 (access forbidden) and an error message
		return res.status(403).send({
			success:false,
			message: 'No token provided.'
		});
	}
});

//===================================  /user  ================================
	apiRouter.route('/users')
	// get all the users (accessed at GET http://localhost::8080/api/users)
	.get(function(req, res) {
			User.find(function(err,users){ 
				if(err) res.send(err);	
				if(err) res.send(err);
				//res: return list of users
					res.json(users);
					});
		});

//===============================  /users/:user_id  ============================
apiRouter.route('/users/:user_id')
	//get the user with that id
	//(accessed at GET http://localhost:8080/api/users/:user_id)
	.get(function(req,res){
		User.findById(req.params.user_id, function(err,user){
			if(err) res.send(err);
			//return that user
			res.json(user);
		});
	})
	//update the user with this id
	//(accessed at PUT http://localhost:8080/api/users/:user_id)
	.put(function(req,res){
			//use our user model to find the user we want
			User.findById(req.params.user_id,function(err,user)
			{
				if(err) res.send(err);
				//update the users info only if its new
				if(req.body.name) user.name = req.body.name;
				if(req.body.username) user.username = req.body.username;
				if(req.body.password) user.password = req.body.password;
				//save the user
				user.save(function(err){
					if(err) res.send(err);
					//return a message
					res.json({message:'User updated!'});
				});
			})
		})

	.delete(function(req, res){
		User.remove({
				_id:req.params.user_id
			}, function(err,user){
				if(err) return res.send(err);
				res.json({message: 'Successfully deleted'});
		});
	});

	return apiRouter;
};