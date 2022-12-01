const Item = require('../models/Item.js');

module.exports = async (req, res, next) => {
  try {
    const item = await Item.getById(req.params.id);
    if (
      req.user &&
      (req.user.id === item.userId || req.user.email === 'admin')
    ) {
      next();
    } else {
      throw new Error('You do not have access to view this page');
    }
  } catch (error) {
    error.status = 403;
    next(error);
  }
};
