const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncMiddleware');
const User = require('../models/user');
const protect = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const {id} = await jwt.verify(token, process.env.JWT_SECRET);
            req.user  = await User.findById(id).select('name email isAdmin');
            next();
        } catch (e) {
            console.error(e);
            res.status(401);
            throw new Error('Invalid token, authorization failed.')
        }
    } else {
        res.status(403);
        throw new Error('Not authorized, access denied.');
    }
});

const admin = asyncHandler(async (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
})

module.exports = {protect, admin};