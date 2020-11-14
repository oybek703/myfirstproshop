const express = require('express');
require('dotenv').config();
const errorHandler = require('./middleware/errorMiddleware');
const notFound = require('./middleware/notFound');
const connectToDB = require('./database');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectToDB().then(() => console.log('Connected to MongoDB...'));
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`));