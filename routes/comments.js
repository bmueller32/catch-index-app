const express = require('express');
const router = express.Router();
const isLoggedIn = require('../config/auth')
const commentsCtrl = require('../controllers/comments');


router.post('/catchlog/:id/comments', isLoggedIn, commentsCtrl.create)
router.delete('/comments/:id', isLoggedIn, commentsCtrl.delete)

module.exports = router;