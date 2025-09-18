// =======================
//  CONTROLLER SẢN PHẨM
//  Chứa các hàm xử lý CRUD cho Product
// =======================

const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// Hiển thị danh sách sản phẩm
exports.index = async(req, res) => {
    const products = await Product.find().populate('supplierId');
    res.render('products/index', { products });
};

// Form thêm mới sản phẩm
exports.newForm = async(req, res) => {
    const suppliers = await Supplier.find();
    res.render('products/new', { suppliers });
};

// Tạo sản phẩm mới
exports.create = async(req, res) => {
    await Product.create(req.body);
    res.redirect('/products');
};

// Form chỉnh sửa sản phẩm
exports.editForm = async(req, res) => {
    const product = await Product.findById(req.params.id);
    const suppliers = await Supplier.find();
    res.render('products/edit', { product, suppliers });
};

// Cập nhật sản phẩm
exports.update = async(req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/products');
};

// Xóa sản phẩm
exports.delete = async(req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
};