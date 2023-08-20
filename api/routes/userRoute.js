const express = require('express');
const router = express.Router();

const {registerUser, loginUser, getCurrentUser} = require('../controllers/userController');

router.post('/register',registerUser).post('/login',loginUser).post('/current',getCurrentUser)


module.exports = router;