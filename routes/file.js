/**
 * Created by admin on 2017/4/19.
 */
var models = require('../database/models');
var File = models.File;
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

module.exports = function(app){
    app.get('/upload',  function(req, res){
        res.render('video/upload', {title: 'Upload Video', user:req.session.user})
    });
    app.post('/upload', multipartMiddleware, function(req, res){
        var username = req.session.username;
        var file = new File(req.body.file);
        var objId;
        console.log(req.files.vdofile);  // 上传的文件信息

        var des_file = __dirname + '/../client/file' + "/" + req.files.vdofile.originalFilename;
        fs.readFile( req.files.vdofile.path, function (err, data) {
            fs.writeFile(des_file, data, function (err) {
                console.log(des_file);
                if( err ){
                    console.log( err );
                }else{
                    response = {
                        message:'File uploaded successfully',
                        filename:req.files.vdofile.originalFilename
                    };
                }
                console.log( response );
                res.end( JSON.stringify( response ) );
            });
        });
    });

    app.get('/playvdo', function (req, res) {
        res.render('video/video', {title: 'Play Video', user: req.session.user});
    });

    app.get('/videoConfig', function(req, res){
        var config = JSON.parse(fs.readFileSync(__dirname+ "./../public/jsons/config.json"));
        res.send({sizes: config.sizes, colors: config.colors, modes: config.modes, inits: config.inits, user: req.session.user});
    });
}