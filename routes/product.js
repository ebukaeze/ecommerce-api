const router = require('express').Router();
const Product = require('../models/Product');

/* router.post("/product", async (req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        desc: req.body.desc,
        categories: req.body.categories,
        size: req.body.size,
        color: req.body.color,
    });
   try{
    const savedProduct = await newProduct.save();
     res.status(201).json(savedProduct);
    }catch(err){
       res.status(500).json(err);
   }
}) */


module.exports = router;