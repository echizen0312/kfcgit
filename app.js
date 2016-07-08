var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var getUsers = require('./api/getUsers');
var addUser = require('./api/addUser');
var delUser = require('./api/delUser');
var getItems = require('./api/getItems');
var addItem = require('./api/addItem');
var delItem = require('./api/delItem');
var addOrder = require('./api/addOrder');
var getOrders = require('./api/getOrders');
var getOrder = require('./api/getOrder');
var updateOrder = require('./api/updateOrder');
var login = require('./api/login');
var exit = require('./api/exit');
var app = express();
var port = 3000;

mongoose.connect('mongodb://10.255.31.110/kfc');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(port, function () {
    console.log('kfc start on port ' + port);
});

app.use(cookieParser());
app.use(session({
    secret: '159753',
    name: 'com.limit.kfc',
    cookie: {maxAge: 30 * 60 * 1000},
    resave: false,
    saveUninitialized: true,
}));
app.use('/KFC', express.static(path.join(__dirname, 'static_kfc')));
app.use('/COLOR', express.static(path.join(__dirname, 'static_color')));
app.all('/', function (req, res) {
    res.redirect('/KFC');
});
app.use('/getUsers', getUsers);
app.use('/addUser', addUser);
app.use('/delUser', delUser);
app.use('/getItems', getItems);
app.use('/addItem', addItem);
app.use('/delItem', delItem);
app.use('/addOrder', addOrder);
app.use('/getOrders', getOrders);
app.use('/getOrder', getOrder);
app.use('/updateOrder', updateOrder);
app.use('/login', login);
app.use('/exit', exit);
