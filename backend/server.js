const path = require('path');
const express = require('express');
require('dotenv').config();
const errorHandler = require('./middleware/errorMiddleware');
const notFound = require('./middleware/notFound');
const connectToDB = require('./database');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');
const uploadRoutes = require('./routes/upload');
const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.resolve('./', 'uploads')));
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes)
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectToDB().then(() => console.log('Connected to MongoDB...'));
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`));