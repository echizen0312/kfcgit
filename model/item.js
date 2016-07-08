var mongoose = require('mongoose');
var itemSchema = require('../schema/item');

var item = mongoose.model('items', itemSchema);

module.exports = item;