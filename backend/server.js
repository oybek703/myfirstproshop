const express = require('express');
const connectToDB = require('./database');
require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
})

const PORT = process.env.PORT || 5000;
connectToDB().then(() => console.log('Connected to MongoDB...'));
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`));