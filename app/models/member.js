var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Member = new Schema({
	name: String,
	realname: String,
	passwd: String,
	department: String,
	title: String,
	status: String
});
module.exports = mongoose.model('Member', Member);


