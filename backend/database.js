const mongoose = require('mongoose');
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
    } catch (e) {
        console.error(`Error while connecting to MongoDB: ${e.message}`);
    }
}

module.exports = connectToDB;