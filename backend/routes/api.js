const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');

router.get('/items', function (req, res) {
    const item = req.query.q
    console.log(item)
    if (item === undefined) {
        res.status(400).json("Bad Request")
    } else {
        requestPromise(`https://api.mercadolibre.com/sites/MLA/search?q=${item}`)
            .then((result) => {
                res.status(200).json(JSON.parse(result));
            })
            .catch(e => res.status(503).json(e))
    }

});
router.get('/items/:id', function (req, res) {
    const id = req.params.id;
    if (id === undefined) {
        res.status(400).json("Bad Request")
    } else {

        let optionsFirstPromise = {
            method: 'GET',
            uri: `https://api.mercadolibre.com/items/${id}`,
            resolveWithFullResponse: true
        };

        requestPromise(optionsFirstPromise)
            .then(principalDataItem => {
                //TODO give format
                console.log("el status code es ", principalDataItem.statusCode)


                if (principalDataItem.statusCode === 200) {

                    let optionsSecondPromise = {
                        method: 'GET',
                        uri: `https://api.mercadolibre.com/items/${id}​/description`,
                        resolveWithFullResponse: true
                    };
                    requestPromise(optionsSecondPromise)
                        .then(descriptionDataItem => {
                            console.log(descriptionDataItem)
                            if (descriptionDataItem.statusCode===200) {
                                res.status(200).json(JSON.parse({
                                    principalData: principalDataItem,
                                    description: descriptionDataItem
                                }));
                            } else {
                                res.status(200).json(JSON.parse({
                                    principalData: principalDataItem
                                }));
                            }

                        })
                        .catch(e => res.status(503).json(e))

                    res.status(200).json(JSON.parse(principalDataItem.body))
                } else {

                }


            })
            .catch(e => res.status(503).json(e))


    }
});

module.exports = router;