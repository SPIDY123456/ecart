const express = require('express');
const axios = require('axios');
const Product = require('../models/Product');
const router = express.Router();

//Admin will post here
router.post('/',async(req,res)=> {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
})

//User will get all products

router.get('/',async(req,res)=> {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const products = response.data;

        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase())||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())

        );

        res.send(filteredProducts);

    }catch(error){
        console.error("Error ",error);
        res.status(500).send("error fetching the data from fakestore");
    }


    });

module.exports = router;
