/**
 * Created by admin on 2017/4/17.
 */
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/myweb');
var Schema = mongoose.Schema;
var userScheMa = new Schema({
    name: String,
    password: String
});
exports.user = db.model('users', userScheMa);