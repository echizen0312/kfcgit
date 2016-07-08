var mongoose = require('mongoose');

var item = new mongoose.Schema({
    itemName: {type: String, unique: true, required: true},
    itemPrice: {type: Number, required: true},
    sortNum: {type: Number, required: true, default: 0},
});

module.exports = item;