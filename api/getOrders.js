var express = require('express');
var router = express.Router();
var order = require('../model/order');

router.post('/', function (req, res) {
    var isLogin = req.session.isLogin;
    if (isLogin) {
        order.find({}).sort({
                '_id': 'desc'
            }
        ).exec(function (err, orders) {
            if (err) {
                res.json({success: false, msg: 'error'});
            } else {
                res.json({success: true, msg: 'ok', orders: orders});
            }
        });
    } else {
        res.json({success: false, msg: 'login'});
    }
});

module.exports = router;