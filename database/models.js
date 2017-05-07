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
});

var DanmuSchema = new Schema({
    mode: String,
    text: String,
    stime: String,
    size: String,
    color: String,
    dur: String
})

exports.User = db.model('User', UserSchema);
exports.File = db.model('File', FileSchema);
exports.Danmu = db.model('Danmu', DanmuSchema);