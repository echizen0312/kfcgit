var express = require('express');
var router = express.Router();
var user = require('../model/user');
var multiparty = require('multiparty');
var fs = require('fs');

router.post('/', function (req, res) {
    var isLogin = req.session.isLogin;
    if (isLogin) {
        var form = new multiparty.Form({uploadDir: './public/files/'});
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.json({success: false, msg: 'error'});
            } else {
                var userName = fields.userName[0];
                if (userName != 'undefined' && userName != '') {
                    if(typeof(files.userFace) != 'undefined'){
                        var inputFile = files.userFace[0];
                        var uploadedPath = inputFile.path;
                        var nnn = inputFile.originalFilename.split('.');
                        var uf = new Date().getTime() + '.' + nnn[nnn.length - 1];
                        var dstPath = './public/files/' + uf;
                        //重命名为真实文件名
                        fs.rename(uploadedPath, dstPath, function (err) {
                            if (err) {
                                console.log('face error');
                            }else{
                                var u = new user({userName: userName, userFace: uf});
                                u.save(function (err) {
                                    if (err) {
                                        res.json({success: false, msg: 'error'});
                                    } else {
                                        res.json({success: true, msg: 'ok'});
                                    }
                                });
                            }
                        });
                    }else{
                        var u = new user({userName: userName, userFace: 'empty'});
                        u.save(function (err) {
                            if (err) {
                                res.json({success: false, msg: 'error'});
                            } else {
                                res.json({success: true, msg: 'ok'});
                            }
                        });
                    }
                } else {
                    res.json({success: false, msg: 'null'});
                }
            }
        });
        // var userName = req.body.userName;
        // var userFace = req.files.userFace;
        // if (userName) {
        //     console.log(userFace);
        //     var u = new user({userName: userName});
        //     u.save(function (err) {
        //         if (err) {
        //             res.json({success: false, msg: 'error'});
        //         } else {
        //             res.json({success: true, msg: 'ok'});
        //         }
        //     });
        // } else {
        //     res.json({success: false, msg: 'null'});
        // }
    } else {
        res.json({success: false, msg: 'login'});
    }
});

module.exports = router;