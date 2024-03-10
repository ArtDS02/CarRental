const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const UserController = require('../controllers/userController');
const cors = require("cors");

// Apply CORS middleware to the entire router
router.use(cors());

// Define routes
router.get('/getUser', authenticateToken, UserController.getUser);
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.put('/:id', authenticateToken, UserController.updateUser);

module.exports = router;
