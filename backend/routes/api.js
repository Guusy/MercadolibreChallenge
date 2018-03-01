const express = require('express');
const router = express.Router();

router.get('/items', function (req, res) {
    res.json('live')
});
router.get('/items/:id', function (req, res) {
    res.json('live')
});

module.exports = router;