const express = require('express');
const controller = require('../controllers');

const router = express.Router();

router.get('/', controller.getAllSales);
router.get('/:id', controller.getSalesByID);
router.post('/', controller.creatSale);

module.exports = router;
