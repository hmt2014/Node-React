/**
 * Created by admin on 2017/4/16.
 */
var MessageList = [

    { "Message":"Hello React"},

    { "Message":"Hello Webpack"},

    { "Message":"Hello Nodejs"},

    { "Message":"Hello Express"}

];

exports.getMessageList = function (callback) {
    callback(MessageList);
};