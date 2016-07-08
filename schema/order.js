var mongoose = require('mongoose');

var order = new mongoose.Schema({
    users: [
        {
            userName: String,
            its: [
                {
                    name: String,
                    num: Number,
                    price: Number
                }
            ],
            isPay: {type: Boolean, default: false}
        }
    ],
    freight: Number,
    total: Number,
    final: Number,
    createTime: {type: Date, required: true, default: Date.now},
});

module.exports = order;