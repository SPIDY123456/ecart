const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.get('/orders', async (req, res) => {
    console.log('Fetching orders');
    try {
        const orders = await Order.find({})
            .populate('userId', 'username') 
            .populate('products.productId', 'title')
    
        res.json(orders);
    } catch (error) {
        console.error("EROOR MAMAS",error)
    }
});

module.exports = router;
