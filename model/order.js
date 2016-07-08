var mongoose = require('mongoose');
var orderSchema = require('../schema/order');

var order = mongoose.model('orders', orderSchema);

module.exports = order;