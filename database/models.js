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

var FileSchema = new Schema({
    username: String,
    title: String,
    des: String
})

exports.User = db.model('User', UserSchema);
exports.File = db.model('File', FileSchema);