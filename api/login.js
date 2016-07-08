var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    var password = req.body.password;
    if (password) {
        if (password != '159753') {
            res.json({success: false, msg: 'error'});
        } else {
            req.session.isLogin = true;
            res.json({success: true, msg: 'ok'});
        }
    }
});

module.exports = router;