const express = require('express');
const router = express.Router();

const catchlogCtrl = require('../controllers/catchlog');

//define route //GET /catchlog
router.get('/', catchlogCtrl.index),






module.exports = router;