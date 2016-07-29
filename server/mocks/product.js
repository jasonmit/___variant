/*jshint node:true*/

module.exports = function(app) {
  var express = require('express');
  var productRouter = express.Router();

  productRouter.get('/:id', function(req, res) {
    res.send(require('../responses/json-api'));
  });

  app.use('/api/products', productRouter);
};
