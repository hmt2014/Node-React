var express = require('express');
var path = require('path');
var ejs = require('ejs');
var user = require('./routes/user');

var app = express();

// 对所有(/)URL或路由返回index.html
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/data/:module', function(req, res, next){
    var c_path = req.params.module;
    var Action = require('./server/action/data/' + c_path);
    Action.execute(req,res);
});
//引入其他路径
user(app);

// 设置views路径和模板
app.set('views', './client/view/main');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// 静态文件配置
app.use('/client', express.static(path.join(__dirname, 'client')));

// 启动一个服务，监听从8888端口进入的所有连接请求
var server = app.listen(8888, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});