const express = require('express');
const router = new express.Router();
const checkForExistingTrees = require('../middleware/existingTrees');
const { newQuery, stream } = require('../controllers/client-controllers');

router.post('/newQuery', checkForExistingTrees, newQuery);

router.post('/stream', checkForExistingTrees, stream);


module.exports = router;