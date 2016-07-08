var express = require('express');
var router = express.Router();
var user = require('../model/user');

router.post('/', function (req, res) {
    var isLogin = req.session.isLogin;
    if (isLogin) {
        var userName = req.body.userName;
        if (userName) {
            var u = new user({userName: userName});
            u.save(function (err) {
                if (err) {
                    res.json({success: false, msg: 'error'});
                } else {
                    res.json({success: true, msg: 'ok'});
                }
            });
        } else {
            res.json({success: false, msg: 'null'});
        }
    } else {
        res.json({success: false, msg: 'login'});
    }
});

module.exports = router;