/**
 * Created by admin on 2017/4/17.
 */
var Settings = require('./settings');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = mongoose.connect(Settings.URL);
module.exports = db;