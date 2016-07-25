var express = require('express');
var router = express.Router();
var user = require('../model/user');
var fs = require('fs');

router.post('/', function (req, res) {
    var isLogin = req.session.isLogin;
    if (isLogin) {
        var id = req.body.id;
        if (id) {
            user.findOne({_id: id}, function (err, u) {
                if (err) {
                    console.log('err');
                } else {
                    if(u.userFace != 'empty'){
                        var dstPath = './public/files/' + u.userFace;
                        fs.unlink(dstPath, function (err) {
                            if (err) {
                                console.log('face del error');
                            }
                        });
                    }
                    u.remove(function (err) {
                        if (err) {
                            res.json({success: false, msg: 'error'});
                        } else {
                            res.json({success: true, msg: 'ok'});
                        }
                    });
                }
            });
            //var dstPath = './public/files/' + uf;
        } else {
            res.json({success: false, msg: 'null'});
        }
    } else {
        res.json({success: false, msg: 'login'});
    }
});

module.exports = router;