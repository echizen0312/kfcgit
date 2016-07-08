var express = require('express');
var router = express.Router();
var user = require('../model/user');

router.post('/', function (req, res) {
    var isLogin = req.session.isLogin;
    if(isLogin) {
        user.find({}).sort({
                '_id': 'asc'
            }
        ).exec(function (err, users) {
            if (err) {
                res.json({success: false, msg: 'error'});
            } else {
                res.json({success: true, msg: 'ok', rows: users});
            }
        });
    }else{
        res.json({success: false, msg: 'login'});
    }
});

module.exports = router;