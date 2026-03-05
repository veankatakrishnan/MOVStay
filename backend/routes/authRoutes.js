const express = require('express');
const router = express.Router();
const { registerStudent, registerOwner, login } = require('../controllers/authController');

router.post('/register-student', registerStudent);
router.post('/register-owner', registerOwner);
router.post('/login', login);

module.exports = router;
