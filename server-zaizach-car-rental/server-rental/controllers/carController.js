const jwt = require('jsonwebtoken');
const Car = require('../models/Car');
const authenticateToken = require('./authMiddleware');