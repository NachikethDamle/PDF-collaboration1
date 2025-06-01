
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

const path = require('path'); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pdf', require('./routes/pdfRoutes'));

module.exports = app;
