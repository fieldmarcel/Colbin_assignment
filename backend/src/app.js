const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:5174', credentials: true })); // adjust origin

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;
