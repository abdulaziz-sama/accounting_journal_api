const express = require('express');
const router = express.Router();
const getTrialBalance = require('../controllers/trial-balance');

router.route('/').get(getTrialBalance);

module.exports = router;