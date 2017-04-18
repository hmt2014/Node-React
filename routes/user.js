/**
 * Created by admin on 2017/4/17.
 */
module.exports = function(app){
    app.post('/login', function(req, res){
        var user ={
            username: 'admin',
            password: '123456'
        }
        if(req.body.username == user.username && req.body.password == user.password ){
            req.session.user = user;
            res.redirect('/home');
        } else {
            req.session.error = "用户名或密码不正确";
            res.redirect('/');
        }
    });
    app.get('/home', function(req, res){
        var user = {
            username: 'admin',
            password: '123456'
        }
        res.render('main/home', {title: 'Home', user:user});
    });
    app.get('/logout', function(req, res){
        req.session.user = null;
        res.redirect('/');
    })
}