const mongoose = require('mongoose');
module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true});
    } catch (e) {
        console.error(`Error while connecting to MongoDB: ${e.message}`);
    }
}