const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);
//"/products/delete" like routesshould come before parametarised one otherwise parameterised
//route will execute and never let specific route execute like "/products/delete"
router.get('/products/:productId', shopController.getProduct); 

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/delete-cart-item', shopController.postDeleteCartProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
