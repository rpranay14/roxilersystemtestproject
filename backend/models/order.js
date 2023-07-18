const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    },
    sold: {
        type: Boolean
    },
    dateOfSale: {
        type: Date
    }
}, {
    timestamps: true
})
const order = mongoose.model('order', orderSchema)
module.exports = order