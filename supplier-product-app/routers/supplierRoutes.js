const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { isLoggedIn } = require('../middleware/authMiddleware');

router.get('/', isLoggedIn, supplierController.getAllSuppliers);
router.get('/new', isLoggedIn, supplierController.getNewSupplier);
router.post('/', isLoggedIn, supplierController.createSupplier);
router.get('/:id/edit', isLoggedIn, supplierController.getEditSupplier);
router.put('/:id', isLoggedIn, supplierController.updateSupplier);
router.delete('/:id', isLoggedIn, supplierController.deleteSupplier);

module.exports = router;