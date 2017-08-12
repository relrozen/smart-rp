const express = require('express');
const Product = require('../models/product-model');

let router = express.Router();

router.get('/', getAll);
router.get('/getAllMin', getAllWithMinimalProps);
router.post('/', createProduct);
router.use('/:productId', getProductById);
router.get('/:productId', getProduct);
router.put('/:productId', updateProduct);


module.exports = router;

function getAll(req, res) {
  Product.find((err, products) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(products);
    }
  })
}

function getAllWithMinimalProps(req, res) {
  Product.find("id hebName", (err, products) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(products);
    }
  })
}

function getProductById(req, res, next) {
  Product.findById(req.params.productId, (err, product) => {
    if (err) {
      res.status(500).send(err);
    }
    else if (product) {
      req.product = product;
      next();
    }
    else {
      res.status(404).send('No product found');
    }
  })
}

function getProduct(req, res) {
  res.json(req.product);
}

function createProduct(req, res) {
  let product = new Product(req.body);
  product.save();
  res.status(201).send(product.toJSON());
}

function updateProduct(req, res) {
  req.product.spec = req.body.spec;
  req.product.save(err => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(req.product.toJSON());
    }
  })
}
