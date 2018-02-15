const express = require('express');
const Ingredient = require('../models/ingredient-model');

let router = express.Router();

router.get('/', getAll);
router.get('/getAllMin', getAllWithMinimalProps);
router.post('/', createIngredient);
router.post('/get-by-ids', getIngredientsByIds);
router.use('/:ingredientId', getIngredientById);
router.get('/:ingredientId', getIngredient);
router.put('/:ingredientId', updateIngredient);
router.delete('/:ingredientId', deleteIngredient);

module.exports = router;

function getAll(req, res) {
  Ingredient.find((err, ingredients) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(ingredients);
    }
  })
}

function getAllWithMinimalProps(req, res) {
  Ingredient.find("id hebName", (err, ingredients) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(ingredients);
    }
  })
}

function getIngredientsByIds(req, res) {
  let ids = req.body;
  Ingredient.find({ "_id": { "$in": ids } }, (err, ingredients) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(ingredients);
    }
  });
}

function getIngredientById(req, res, next) {
  Ingredient.findById(req.params.ingredientId, (err, ingredient) => {
    if (err) {
      res.status(500).send(err);
    }
    else if (ingredient) {
      req.ingredient = ingredient;
      next();
    }
    else {
      res.status(404).send('No ingredient found');
    }
  })
}

function getIngredient(req, res) {
  res.json(req.ingredient);
}

function createIngredient(req, res) {
  let ingredient = new Ingredient(req.body);
  // console.log(ingredient);
  ingredient.save((err) => {
    if (err) { console.log(err) }
  });
  res.status(201).send(ingredient.toJSON());
}

function updateIngredient(req, res) {
  req.ingredient.spec = req.body.spec;
  req.ingredient.save(err => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.json(req.ingredient.toJSON());
    }
  })
}

function deleteIngredient(req, res) {
  req.ingredient.remove(err => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(204).send('Removed')
    }
  })
}
