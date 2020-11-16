const protect = require("../middleware/authMiddleware");
const asyncHandler = require('../middleware/asyncMiddleware');
const Order = require('../models/order');
const {Router} = require('express');
const router = Router();

router.post('/', protect, asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;
    if(orderItems && !orderItems.length) {
        res.status(400)
        throw new Error('No order items.');
    } else {
        const order = await Order.create({orderItems, shippingAddress, shippingPrice, paymentMethod, taxPrice, shippingPrice, totalPrice, user: req.user._id});
        res.status(201).send(order);
    }
}));


module.exports = router;