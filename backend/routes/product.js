const {Router} = require('express');
const Product = require('../models/product');
const asyncHandler = require('../middleware/asyncMiddleware');
const {protect, admin} = require('../middleware/authMiddleware');
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

//delete product by ID
router.delete('/:id', [protect, admin], asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        await product.remove();
        res.status(200).send({msg: 'Product removed.'});
    } else {
        res.status(404);
        throw new Error('Product not found.');
    }
}));

//create new sample product
router.post('/', [protect, admin], asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: 'Sample name',
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample category',
        description: 'Sample description'
    });
    const createdProduct = await product.save();
    res.status(201).send(createdProduct);
}));

//update product  by ID
router.put('/:id', [protect, admin], asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
     if(product) {
         const {name, image, brand, category, countInStock, description, price} = req.body;
         product.name = name;
         product.image = image;
         product.brand = brand;
         product.category = category;
         product.countInStock = countInStock;
         product.description = description;
         product.price = price;
         req.body.user = req.user._id;
         const updatedProduct = await product.save();
         res.send(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found.');
    }
}));

module.exports = router;