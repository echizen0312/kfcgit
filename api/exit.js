var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    req.session.isLogin = false;
    res.json({success: true, msg: 'ok'});
});

module.exports = router;