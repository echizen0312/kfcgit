var mongoose = require('mongoose');

var user = new mongoose.Schema({
    userName: {type: String, unique: true, required: true},
    userFace: {type: String, required: true},
    createTime: {type: Date, required: true, default: Date.now},
});

module.exports = user;