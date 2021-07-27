const express = require('express');
const router = express.Router();
const {getEntry, postEntry, deleteEntry} = require('../controllers/entry');


router.route('/').get(getEntry).post(postEntry).delete(deleteEntry);

module.exports = router;
