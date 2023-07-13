const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/auth')
const catchlogCtrl = require('../controllers/catchlog');

//GET /catchlog //define route
router.get('/', catchlogCtrl.index),
//GET /catchlog/new
router.get('/new', isLoggedIn,catchlogCtrl.new);
//GET /catchlog/:id (show) must be below new
router.get('/:id', catchlogCtrl.show);
// POST / catchlog
router.post('/', isLoggedIn, catchlogCtrl.create);
//Get /catchlog/:id/edit
router.get('/:id/edit', isLoggedIn, catchlogCtrl.edit)
//PUT /catchlog/:id
router.put('/:id', isLoggedIn, catchlogCtrl.update);




module.exports = router;