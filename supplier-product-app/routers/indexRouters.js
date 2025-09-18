const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => {
  const suppliers = await Supplier.find();
  let products = await Product.find().populate('supplier');
  
  // Filter by supplier if query param
  if (req.query.supplier) {
    products = products.filter(p => p.supplier.name === req.query.supplier);
  }
  
  // Search by product name if query param
  if (req.query.search) {
    products = products.filter(p => p.name.toLowerCase().includes(req.query.search.toLowerCase()));
  }
  
  res.render('index', { products, suppliers });
});

module.exports = router;