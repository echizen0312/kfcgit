var mongoose = require('mongoose');
var userSchema = require('../schema/user');

var user = mongoose.model('users', userSchema);

module.exports = user;