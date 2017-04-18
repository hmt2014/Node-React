/**
 * Created by admin on 2017/4/18.
 */
var mongo = require('mongoose');
var Schema = mongo.Schema;
var db = require('./msession');

var UserSchema = new Schema({
    username: String,
    password: String
});

exports.User = db.model('User', UserSchema);