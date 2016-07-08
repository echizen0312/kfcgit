var express = require('express');
var router = express.Router();
var item = require('../model/item');

router.post('/', function (req, res) {
    var isLogin = req.session.isLogin;
    if (isLogin) {
        var itemName = req.body.itemName;
        var itemPrice = req.body.itemPrice;
        var sortNum = req.body.sortNum;
        if (itemName && itemPrice) {
            var ite;
            if (sortNum) {
                ite = new item({itemName: itemName, itemPrice: itemPrice, sortNum: sortNum});
            } else {
                ite = new item({itemName: itemName, itemPrice: itemPrice});
            }
            ite.save(function (err) {
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