const express = require('express');
const router = express.Router();

// Mocked database for storing orders
const ordersDB = [];

router.post('/orders', (req, res) => {
    const { userId, products } = req.body;
    // Create a new order object
    const newOrder = {
        id: ordersDB.length + 1,
        userId,
        products,
        status: 'Pending', // You can adjust this as per your requirements
    };

    // Save to "database"
    ordersDB.push(newOrder);

    res.status(201).json(newOrder); // Respond with the created order
});

router.get('/orders/carts', (req, res) => {
    // Return all orders (you may want to add authentication/authorization)
    res.json(ordersDB);
});

module.exports = router;
