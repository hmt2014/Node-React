/**
 * Created by admin on 2017/4/17.
 */
var Settings = require('./settings');
 var Db = require('mongodb').Db;
 var Server = require('mongodb').Server;
 var db = new Db(Settings.DB, new Server(Settings.HOST, Settings.PORT, {auto_reconnect:true, native_parser: true, w: 1}),{safe: true});

 module.exports = db;