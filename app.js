//require modules ===================================

var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
methodOverride = require('method-override');

//configuration ====================================

//config files
// var db = require('./config/db');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/telecom');

//set the PORT
var port = process.env.PORT||4000;


//parse application/json
app.use(bodyParser.json());
//parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

//set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));


//require the Model Member
var Member = require('./app/models/member');


//routes ===========================================
var router = express.Router();

router.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin','*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	console.log('api is running');
	// req.on('timeout',function(){
    // 	// pretend like data was written out
	// 	res.write = res.end = function(){ return true };
	// 	// no headers, plz
	// 	res.setHeader = res.writeHead = res.addTrailers = function(){};
	// });
	next();

});

router.route('/members')
	//增加人员
	.post(function(req, res) {
		var member = new Member();
		member.name = req.body.name;
		member.realname = req.body.realname;
		member.passwd = req.body.passwd;
		member.department = req.body.department;
		member.title = req.body.title;
		member.status = req.body.status;
		
		member.save(function(err){
			if(err){
				res.send(err);
			};
			res.json({message: 'Member created'})
		});
	})
	//list页面获取所有人员
	.get(function(req, res) {
		Member.find(function(err, members) {
			if(err) {
				res.send(err);
			};
			res.json({message: members});
		});
	});
	
router.route('/members/:member_id')
	.get(function(req, res) {
		Member.findById(req.params.member_id, function(err, member) {
			if(err) {
				return res.send(err);
			};
			res.json({message:member});
		});
	})
	.delete(function(req, res) {
		Member.remove({
			_id: req.params.member_id
		}, function(err, member) {
			if(err) {
				return res.send(err);
			};
			//if there is not a return, will throw an error Error: Can't set headers after they are sent.
			//return is for preventing it from trying to set headers again 
			res.json({message: 'Successfully deleted'});
		});
	})
	
	

app.use('/api', router);






//start up =========================================
app.listen(port);

//shoutout to the user
console.log('Server is listening on PORT ' + port);

//expose app
exports = module.exports = app;