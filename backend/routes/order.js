const {protect} = require("../middleware/authMiddleware");
const asyncHandler = require('../middleware/asyncMiddleware');
const Order = require('../models/order');
const {Router} = require('express');
const router = Router();

// get user orders
router.get('/my', protect, asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.status(200).send(orders);
}))

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

//update paid for order
router.put('/:id/pay', protect, asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updatedOrder = await order.save();
        res.status(200).send(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found.');
    }
}));


module.exports = router;