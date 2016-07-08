var express = require('express');
var router = express.Router();
var item = require('../model/item');

router.post('/', function (req, res) {
    var isLogin = req.session.isLogin;
    if (isLogin) {
        item.find({}).sort({
                'sortNum': 'desc'
            }
        ).exec(function (err, items) {
            if (err) {
                res.json({success: false, msg: 'error'});
            } else {
                res.json({success: true, msg: 'ok', rows: items});
            }
        });
    } else {
        res.json({success: false, msg: 'login'});
    }
});

module.exports = router;