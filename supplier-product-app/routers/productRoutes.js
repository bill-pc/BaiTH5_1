const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isLoggedIn } = require('../middleware/authMiddleware');

router.get('/', isLoggedIn, productController.getAllProducts);
router.get('/new', isLoggedIn, productController.getNewProduct);
router.post('/', isLoggedIn, productController.createProduct);
router.get('/:id/edit', isLoggedIn, productController.getEditProduct);
router.put('/:id', isLoggedIn, productController.updateProduct);
router.delete('/:id', isLoggedIn, productController.deleteProduct);

module.exports = router;