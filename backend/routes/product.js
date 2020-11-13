const {Router} = require('express');
const Product = require('../models/product');
const asyncHandler = require('../middleware/asyncMiddleware');
const router = Router();

//get all products
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.status(200).send(products);
}));

// get single product
router.get('/:id', asyncHandler(async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product) {
        return res.status(404).send({msg: 'Product not  found.'});
    }
    res.status(200).send(product);
}));

module.exports = router;