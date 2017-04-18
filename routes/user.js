/**
 * Created by admin on 2017/4/17.
 */
var models = require('../database/models');
var User = models.User;
module.exports = function(app){
    app.post('/login', function(req, res){
        var query_doc = {username: req.body.username, password: req.body.password};
        var user = new User({username: req.body.username, password: req.body.password});
        User.count(query_doc, function(error, doc){
            if(doc == 1){
                req.session.user = user;
                res.redirect('/home');
            } else{
                req.session.error = "用户名或密码不正确";
                res.redirect('/');
            }
        });
    });
    app.get('/home', function(req, res){
        res.render('main/home', {title: 'Home', user:req.session.user});
    });
    app.get('/logout', function(req, res){
        req.session.user = null;
        res.redirect('/');
    });
    app.get('/register', function(req, res){
       res.render('main/register', {title: 'Register'})
    }).post('/register',function(req, res){
        var user = new User(req.body.user);
        user.save(function(err, user){
            if(!err){
                console.log("regist successfully！");
                req.session.user = user;
                res.redirect('/home');
            }else{
                console.err(err);
            }
        })
    });
}