const express = require('express');
const controller = require('../controllers');

const { checkName } = require('../middlewares/productsMiddleware.js');

const router = express.Router();

router.get('/', controller.getAllProducts);
router.get('/:id', controller.getProductById);
router.post('/', controller.createProduct);
router.put('/:id', checkName, controller.updateProductByID);

// S.O.S ----

module.exports = router;
