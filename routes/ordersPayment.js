const express = require('express');
const router = express.Router();
const orderPaymentHandler = require('./handler/order-payment');

// const verifyToken = require('../middlewares/verifyToken');

router.get('/', orderPaymentHandler.getOrders);

module.exports = router;
