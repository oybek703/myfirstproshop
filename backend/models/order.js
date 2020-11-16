const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
     user: {
         type: mongoose.Schema.ObjectId,
         required: true,
         ref: 'User'
     },
    orderItems: [{
         name: {type: String, required: true},
         qty: {type: Number, required: true},
         image: {type: String, required: true},
         price: {type: Number, required: true},
         product: {type: mongoose.Schema.ObjectId, required: true, ref: 'Product'}
    }],
    shippingAddress: {
         address: {type: String, required: true},
         city: {type: String, required: true},
         postalCode: {type: String, required: true},
         country: {type: String, required: true}
    },
    paymentMethod: {
         type: String,
         required: true
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    taxPrice: {
         type: Number,
         required: true,
         default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
         type: String,
         required: true,
         default: 0.0
    },
    isPaid: {
         type: Boolean,
        required: true,
        default: false
    },
    paidAt: Date,
    isDelivered: {
         type: Boolean,
         required: true,
        default: false
    },
    deliveredAt:Date
}, { timestamps: true});

module.exports = mongoose.model('Order', orderSchema);
