// =======================
//  ROUTES NHÀ CUNG CẤP
//  Khai báo các đường dẫn (URL) cho CRUD Supplier
// =======================

const express = require('express');
const router = express.Router();
const supplierCtrl = require('../controllers/supplierController');

// Hiển thị danh sách nhà cung cấp
router.get('/', supplierCtrl.index);

// Form thêm mới nhà cung cấp
router.get('/new', supplierCtrl.newForm);

// Xử lý thêm mới nhà cung cấp
router.post('/', supplierCtrl.create);

// Form chỉnh sửa nhà cung cấp theo ID
router.get('/:id/edit', supplierCtrl.editForm);

// Cập nhật nhà cung cấp theo ID
router.put('/:id', supplierCtrl.update);

// Xóa nhà cung cấp theo ID
router.delete('/:id', supplierCtrl.delete);

module.exports = router;