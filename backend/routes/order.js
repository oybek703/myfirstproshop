const protect = require("../middleware/authMiddleware");
const asyncHandler = require('../middleware/asyncMiddleware');
const Order = require('../models/order');
const {Router} = require('express');
const router = Router();

//add new order
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

//get order by ID
router.get('/:id', protect, asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(!order) {
        res.status(404);
        throw new Error('Error not found.');
    } else  {
        res.status(200).send(order);
    }

}));

module.exports = router;