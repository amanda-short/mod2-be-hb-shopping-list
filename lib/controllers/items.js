const { Router } = require('express');
const itemMid = require('../middleware/itemMid.js');
const authenticate = require('../middleware/authenticate.js');
const authorize = require('../middleware/authorize.js');
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
  })

  .put('/:id', authenticate, itemMid, async (req, res, next) => {
    try {
      const updateItems = await Item.updateById(req.params.id, req.body);
      res.json(updateItems);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', authenticate, authorize, itemMid, async (req, res, next) => {
    try {
      const deleteItem = await Item.delete(req.params.id);
      res.json(deleteItem);
    } catch (e) {
      next(e);
    }
  });
