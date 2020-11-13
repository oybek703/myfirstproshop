const path = require('path');
require('dotenv').config({path: path.resolve('../.env')});
const products = require('./data/products') ;
const connectToDB = require('./database');
const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const users = require('./data/users');


connectToDB().then(() => console.log('Connected...'));

const importData = async () => {
    try {
        await Order.deleteMany({});
        await User.deleteMany({});
        await Product.deleteMany({});
        const createdUsers = await User.insertMany(users);
        const admin = createdUsers[0]._id;
        const sampleProducts = products.map(product => ({...product, user: admin}));
        await Product.insertMany(sampleProducts);
        console.log('Data imported!');
        process.exit();
    } catch (e) {
        console.error(`Error with seeder: ${e.message}`);
    }
}

const deleteData = async () => {
    try {
        await Order.deleteMany({});
        await User.deleteMany({});
        await Product.deleteMany({});
        console.log('Data  destroyed!');
        process.exit();
    } catch (e) {
        console.error(`Error with seeder: ${e.message}`);
    }
}

if(process.argv[2] === '-d') {
    deleteData();
} else if(process.argv[2] === '-i') {
    importData();
}