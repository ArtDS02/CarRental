const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.post('/add',carController.add);

module.exports = router;