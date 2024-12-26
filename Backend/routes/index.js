const express = require('express');
const recommendation = require('../controllers/recommendation');

const router = express.Router();

router.get('/health', recommendation.healthCheck);
router.get('/build-model', recommendation.buildModel);
router.get('/recommendations/:userId', recommendation.recommendations);

module.exports = router;
