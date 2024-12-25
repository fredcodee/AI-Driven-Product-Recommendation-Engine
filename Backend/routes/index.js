const express = require('express');
const { getRecommendations } = require('../controllers/recommendation');

const router = express.Router();

// Define a route for recommendations
router.get('/recommendations', getRecommendations);

module.exports = router;
