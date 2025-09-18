// =======================
//  CONTROLLER NHÀ CUNG CẤP
//  Chứa các hàm xử lý CRUD cho Supplier
// =======================

const Supplier = require('../models/Supplier');

// Hiển thị danh sách nhà cung cấp
exports.index = async(req, res) => {
    const suppliers = await Supplier.find();
    res.render('suppliers/index', { suppliers });
};

// Form thêm mới nhà cung cấp
exports.newForm = (req, res) => {
    res.render('suppliers/new');
};

// Tạo nhà cung cấp mới
exports.create = async(req, res) => {
    await Supplier.create(req.body);
    res.redirect('/suppliers');
};

// Form chỉnh sửa nhà cung cấp
exports.editForm = async(req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/edit', { supplier });
};

// Cập nhật nhà cung cấp
exports.update = async(req, res) => {
    await Supplier.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/suppliers');
};

// Xóa nhà cung cấp
exports.delete = async(req, res) => {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
};