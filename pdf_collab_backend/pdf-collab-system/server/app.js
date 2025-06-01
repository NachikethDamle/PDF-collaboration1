
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use('/uploads', express.static('uploads'));


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pdf', require('./routes/pdfRoutes'));

module.exports = app;
