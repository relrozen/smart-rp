const express = require('express');
const RawMaterial = require('../models/raw-material-model');

let router = express.Router();

router.get('/', getAll);
router.get('/getAllMin', getAllWithMinimalProps);
router.post('/', createRawMaterial);
router.use('/:rawMaterialId', getRawMaterialById);
router.get('/:rawMaterialId', getRawMaterial);
router.put('/:rawMaterialId', updateRawMaterial);
router.delete('/:rawMaterialId', deleteRawMaterial);

module.exports = router;

function getAll(req, res) {
  RawMaterial.find((err, rawMaterials) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(rawMaterials);
    }
  })
}

function getAllWithMinimalProps(req, res) {
  RawMaterial.find("id hebName", (err, rawMaterials) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(rawMaterials);
    }
  })
}

function getRawMaterialById(req, res, next) {
  RawMaterial.findById(req.params.rawMaterialId, (err, rawMaterial) => {
    if (err) {
      res.status(500).send(err);
    }
    else if (rawMaterial) {
      req.rawMaterial = rawMaterial;
      next();
    }
    else {
      res.status(404).send('No rawMaterial found');
    }
  })
}

function getRawMaterial(req, res) {
  res.json(req.rawMaterial);
}

function createRawMaterial(req, res) {
  let rawMaterial = new RawMaterial(req.body);
  // console.log(rawMaterial);
  rawMaterial.save((err) => {
    if (err) { console.log(err) }
  });
  res.status(201).send(rawMaterial.toJSON());
}

function updateRawMaterial(req, res) {
  req.rawMaterial.spec = req.body.spec;
  req.rawMaterial.save(err => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(req.rawMaterial.toJSON());
    }
  })
}

function deleteRawMaterial(req, res) {
  req.rawMaterial.remove(err => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(204).send('Removed')
    }
  })
}
