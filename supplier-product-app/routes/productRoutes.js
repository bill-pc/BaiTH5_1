// =======================
//  ROUTES SẢN PHẨM
//  Khai báo các đường dẫn (URL) cho CRUD Product
// =======================

const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productController');

// Hiển thị danh sách sản phẩm
router.get('/', productCtrl.index);

// Form thêm mới sản phẩm
router.get('/new', productCtrl.newForm);

// Xử lý thêm mới sản phẩm
router.post('/', productCtrl.create);

// Form chỉnh sửa sản phẩm theo ID
router.get('/:id/edit', productCtrl.editForm);

// Cập nhật sản phẩm theo ID
router.put('/:id', productCtrl.update);

// Xóa sản phẩm theo ID
router.delete('/:id', productCtrl.delete);

module.exports = router;