/**
 * Created by admin on 2017/4/16.
 */
var getMessageList = require('../../data/getMessage');

exports.execute = function (req, res) {
    getMessageList.getMessageList(function (data) {
        res.send(data);
    });
};