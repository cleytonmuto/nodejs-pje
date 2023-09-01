'use strict';

const express = require('express');
const processoRouter = express.Router();

const authJwt = require('../middleware/authJwt');
const controller = require('../controllers/processo.controller');

// processoRouter.get('/all', [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);
// processoRouter.get('/short', [authJwt.verifyToken, authJwt.isAdmin], controller.findShort);
// processoRouter.get('/countRows', [authJwt.verifyToken, authJwt.isAdmin], controller.countRows);
// processoRouter.get('/404', controller.pageNotFound);
// processoRouter.get('/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.findOne);

// processoRouter.post('/add', [authJwt.verifyToken, authJwt.isAdmin], controller.create);
// processoRouter.post('/search', [authJwt.verifyToken, authJwt.isAdmin], controller.findSome);
// processoRouter.post('/update', [authJwt.verifyToken, authJwt.isAdmin],
//   controller.update)

// processoRouter.delete('/delete', [authJwt.verifyToken, authJwt.isAdmin],
//   controller.exclude);

processoRouter.get('/all', controller.findAll);
processoRouter.get('/short', controller.findShort);
processoRouter.get('/countRows', controller.countRows);
processoRouter.get('/404', controller.pageNotFound);
processoRouter.get('/:id', controller.findOne);

processoRouter.post('/add', controller.create);
processoRouter.post('/search', controller.findSome);
processoRouter.post('/update', controller.update)

processoRouter.delete('/delete', controller.exclude);

module.exports = processoRouter;
