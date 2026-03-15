require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const path = require('path');
const dns = require("dns");

// DNS configuration
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const dbConnection = require('./db');

// Middleware
app.use(express.json());

// Routes
app.use('/api/cars', require('./routes/carsRoute'));
app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/bookings', require('./routes/bookingsRoute'));

// Production setup (React build)
if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
    });
}

// Test route
app.get('/', (req, res) => {
    res.send('Car Rental API Running');
});

// Start server
app.listen(port, () => console.log(`🚀 Node JS Server Started on Port ${port}`));
