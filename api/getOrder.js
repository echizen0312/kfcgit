var express = require('express');
var router = express.Router();
var order = require('../model/order');

router.post('/', function (req, res) {
    var isLogin = req.session.isLogin;
    if (isLogin) {
        var id = req.body.id;
        if (id) {
            order.findOne({_id: id}, function (err, order) {
                if (err) {
                    res.json({success: false, msg: 'error'});
                } else {
                    res.json({success: true, msg: 'ok', order: order});
                }
            });
        } else {
            res.json({success: false, msg: 'empty'});
        }
    } else {
        res.json({success: false, msg: 'login'});
    }
});

module.exports = router;