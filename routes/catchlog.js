const express = require('express');
const router = express.Router();

const catchlogCtrl = require('../controllers/catchlog');

//GET /catchlog //define route
router.get('/', catchlogCtrl.index),
//GET /catchlog/new
router.get('/new',catchlogCtrl.new);
//GET /catchlog/:id (show) must be below new
router.get('/:id', catchlogCtrl.show);






module.exports = router;