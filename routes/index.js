const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (request, response) => {
    response.render('index');
});

module.exports = router;