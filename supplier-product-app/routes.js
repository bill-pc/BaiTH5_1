const express = require('express');
const supplierController = require('./controllers/supplierController');
const productController = require('./controllers/productController');
const router = express.Router();

// Supplier routes
router.get('/suppliers', supplierController.list);
router.get('/suppliers/create', supplierController.createForm);
router.post('/suppliers/create', supplierController.create);
router.get('/suppliers/:id/edit', supplierController.editForm);
router.post('/suppliers/:id/edit', supplierController.update);
router.post('/suppliers/:id/delete', supplierController.delete);

// Product routes
router.get('/products', productController.list);
router.get('/products/create', productController.createForm);
router.post('/products/create', productController.create);
router.get('/products/:id/edit', productController.editForm);
router.post('/products/:id/edit', productController.update);
router.post('/products/:id/delete', productController.delete);

module.exports = router;
