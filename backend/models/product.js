const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {type: String,required: true},
    rating: {type: Boolean,required: true},
    comment: {type: String,required: true}
}, {timestamps: true});

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: String,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema]
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);