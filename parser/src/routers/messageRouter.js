const express = require('express');
const { parser } = require('../controllers/parser-controller');

const router = new express.Router();

router.post('/', parser);

module.exports = router;