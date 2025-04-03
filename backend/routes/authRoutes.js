const express = require('express');

const router = express.Router();

const { 
    signup, 
    login, 
    logout, 
    verifyEmail, 
    forgetPassword, 
    resetPassword,
    checkAuth, 
} = require('../controllers/authControllers');

const protactRoute  = require('../middleware/protactRoute');


// Routes

router.get('/check-auth', protactRoute, checkAuth);
router.post('/signup', signup);

router.post('/login', login);

router.get('/logout', logout);

router.post('/verified', verifyEmail);

router.post('/forget-password', forgetPassword);

router.put('/reset-password/:token', resetPassword);

module.exports = router;