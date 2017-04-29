var express = require('express');
var path = require('path');
var ejs = require('ejs');
var user = require('./routes/user');
var file = require('./routes/file');
var bodyParser = require('body-parser');

var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



//数据库
//采用connect-mongodb中间件作为Session存储
var session = require('express-session');
var Settings = require('./database/settings');
var MongoStore = require('connect-mongodb');
var db = require('./database/msession');

var app = express();
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

//session的配置
app.use(session({
    resave: false,//重新保存：强制会话保存即使是未修改的。(默认值ture)
    saveUninitialized: true,//强制保存未初始化的会话到存储器
    cookie: {maxAge : 600000},
    secret: Settings.COOKIE_SECRET,
    store: new MongoStore({
        username: Settings.USERNAME,
        password: Settings.PASSWORD,
        url: Settings.URL,
        db: db
    })
}))

// 对所有(/)URL或路由返回index.html
app.get('/', function (req, res) {
    res.render('main/index');
});

app.get('/file/:module', function(req, res, next){
    var c_path = req.params.module;
    var Action = require('./server/action/file/' + c_path);
    Action.execute(req,res);
});
//引入其他路径
user(app);
file(app);

// 设置views路径和模板
app.set('views', './client/view');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// 静态文件配置
app.use('/client', express.static(path.join(__dirname, 'client')));


/*---------catch 404 and forward to error handler---------------*/
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})
//error handlers
if(app.get('env') === 'development'){
    app.use(function(err, req, res, next){
        res.status(err.status || 500);
        res.render('main/error', {
            message: err.message,
            error: err
        });
    });
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    res.render('main/error', {
        message: err.message,
        error: {}
    })
})

// 启动一个服务，监听从8888端口进入的所有连接请求
var server = app.listen(8888, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});

//create socket.io
var io = require('socket.io')(server);
//wait for socket event
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('message send', function(msg){
        console.log('message:' + msg);
        io.emit('message show', msg);
    })
})