const { Router } = require('express');
const authenticate = require('../middleware/authenticate.js');
const Item = require('../models/Item.js');

module.exports = Router()

  .post('/', authenticate, async (req, res, next) => {
    try {
      const newItem = await Item.insert({
        description: req.body.description,
        qty: req.body.qty,
        userId: req.user.id,
        bought: req.body.bought,
      });
      res.json(newItem);
    } catch (e) {
      next(e);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      res.json(items);
    } catch (e) {
      next(e);
    }
  });

