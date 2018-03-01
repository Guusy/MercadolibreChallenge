const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');

router.get('/items', function (req, res) {
    const item = req.query.q
    console.log(item)
    if(item ===undefined){
        res.status(400).json("Bad Request")
    }else{
        requestPromise(`https://api.mercadolibre.com/sites/MLA/search?q=${item}`)
        .then((result) => {
           res.status(200).json(JSON.parse(result));
       })
       .catch(e=>res.status(503).json(e))
    }
    
});
router.get('/items/:id', function (req, res) {
    res.json('live')
});

module.exports = router;