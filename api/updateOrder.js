var express = require('express');
var router = express.Router();
var order = require('../model/order');

router.post('/', function (req, res) {
    var isLogin = req.session.isLogin;
    if (isLogin) {
        var oid = req.body.oid;
        var users = req.body.users;
        if (oid && users) {
            order.update({_id: oid}, {$set: {users: users}}, function (err) {
                if (err) {
                    res.json({success: false, msg: 'error'});
                } else {
                    res.json({success: true, msg: 'ok'});
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