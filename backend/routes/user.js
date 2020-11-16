const {Router} = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncMiddleware');
const User = require('../models/user');
const {protect, admin} = require('../middleware/authMiddleware');
const router = Router();

//get all users
router.get('/', [protect, admin], asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).send(users);
}));

//register user
router.post('/register', asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    let user = await User.findOne({email});
    if(user) {
        res.status(400);
        throw new Error('User already exists.');
    }
    user = await User.create({name, email, password});
    const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
    res.status(201).send({_id: user._id, name: user.name, email: user.email, token});
}));

//login user
router.post('/login', asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))) {
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        res.status(200).send({_id: user._id, email, name: user.name, isAdmin: user.isAdmin, token});
    } else {
        res.status(401);
        throw new Error('Invalid email or password.');
    }

}));

//get user profile
router.get('/profile', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) {
        res.status(404);
        throw new Error('User not found.');
    }
    res.send({_id: user._id,name: user.name, email: user.email, isAdmin: user.isAdmin});
}));

//update user profile
router.put('/profile', protect, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).send({_id: updatedUser._id ,name: updatedUser.name, email: updatedUser.email, isAdmin: updatedUser.isAdmin});
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
}));

//delete user
router.delete('/:id', [protect, admin], asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        await user.remove();
        res.send({msg: 'User removed.'});
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
}));

//get user by ID
router.get('/:id', [protect, admin], asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user) {
        res.status(200).send(user);
    } else {
        res.status(404);
        res.send({msg: 'User not found.'});
    }
}));

//update user by ID
router.put('/:id', [protect, admin], asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(!user) {
        res.status(404);
        res.send({msg: 'User not found.'});
    } else {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        if(req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).send(updatedUser);
    }
}));

module.exports = router;