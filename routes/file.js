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
        res.render('video/upload', {title: 'Upload Video'})
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

        /*
        file.save(function(err, file){
            if(!err){
                console.log("upload successfully！");
                objId = file._id;
                console.log(objId);
            }else{
                console.err(err);
            }
        });
        console.log("111");*/
    });

    app.get('/playvdo', function (req, res) {
        res.render('video/video', {title: 'Play Video'});
    })
}