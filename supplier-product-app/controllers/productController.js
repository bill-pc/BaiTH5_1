const Product = require('../models/product');
const Supplier = require('../models/Supplier');

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().populate('supplier');
  res.render('products/index', { products });
};

exports.getNewProduct = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/new', { suppliers });
};

exports.createProduct = async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  await Product.create({ name, price, quantity, supplier });
  req.flash('success_msg', 'Product created');
  res.redirect('/products');
};

exports.getEditProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('supplier');
  const suppliers = await Supplier.find();
  res.render('products/edit', { product, suppliers });
};

exports.updateProduct = async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
  req.flash('success_msg', 'Product updated');
  res.redirect('/products');
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Product deleted');
  res.redirect('/products');
};