// require mongoose and other
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
    //bcrypt = require('bcrypt-nodejs');

var Status = new Schema({
    statusId: String,
    content: String 
});

Status.plugin(passportLocalMongoose);

module.exports = mongoose.model('Status', Status);