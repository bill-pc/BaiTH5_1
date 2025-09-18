const Supplier = require('../models/Supplier');
const Product = require('../models/product');

exports.getAllSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('suppliers/index', { suppliers });
};

exports.getNewSupplier = (req, res) => {
  res.render('suppliers/new');
};

exports.createSupplier = async (req, res) => {
  const { name, address, phone } = req.body;
  await Supplier.create({ name, address, phone });
  req.flash('success_msg', 'Supplier created');
  res.redirect('/suppliers');
};

exports.getEditSupplier = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render('suppliers/edit', { supplier });
};

exports.updateSupplier = async (req, res) => {
  const { name, address, phone } = req.body;
  await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
  req.flash('success_msg', 'Supplier updated');
  res.redirect('/suppliers');
};

exports.deleteSupplier = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  await Product.deleteMany({ supplier: req.params.id });
  req.flash('success_msg', 'Supplier deleted');
  res.redirect('/suppliers');
};