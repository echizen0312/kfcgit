var express = require('express');
var router = express.Router();
var order = require('../model/order');

router.post('/', function (req, res) {
    var isLogin = req.session.isLogin;
    if (isLogin) {
        var users = req.body.users;
        var freight = req.body.freight;
        var total = req.body.total;
        var final = req.body.final;
        if (users && freight && total && final) {
            var o = new order({users: users, freight: freight, total: total, final: final});
            o.save(function (err) {
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