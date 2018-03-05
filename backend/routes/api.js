const config = require("../config/configFile");

const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');


const aceptableSizeImage = '499';
const numberOfLimitResults='4';

//function to get decimals in specific item
const parsePrice = (amount, currency) => {

    let arrayAmount = amount.toString().split(".");
    return {
        currency: currency,
        amount: arrayAmount[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
        decimals: (arrayAmount[1] === undefined) ? '00' : arrayAmount[1]
    }
};

//function to get the resolution picture for a specific item
const getTheBestPicture = (arrayPictures) => {

    let niceImage = arrayPictures.find(picture => {
        let arraySize = picture.size.split("x");
        return arraySize[0] > aceptableSizeImage && arraySize[1] > aceptableSizeImage
    });
    if (niceImage === undefined) {
        return arrayPictures[0].secure_url
    } else {
        return niceImage.secure_url

    }

};

//function to format object to return at front end.
const formatItem = (arrayToGetData, individualItem) => {

    return {
        author: {
            name: '',
            lastname: ''
        },
        id: arrayToGetData.id,
        title: arrayToGetData.title,
        price: parsePrice(arrayToGetData.price, arrayToGetData.currency_id),
        picture: (individualItem) ? getTheBestPicture(arrayToGetData.pictures) : arrayToGetData.thumbnail,
        condition: (arrayToGetData.condition === 'new') ? "Nuevo" : (arrayToGetData.condition === 'used') ? "Usado" : "No especificado",
        sold_quantity: arrayToGetData.sold_quantity,
        free_shipping: arrayToGetData.shipping.free_shipping,
        state_name: (!individualItem) ? arrayToGetData.address.state_name : ''

    }
};

//function to disarm array of categories
const disarmCategories = (arrayCategories) => arrayCategories.map(category => category.name);

//get list of items about a query
router.get('/items', function (req, res) {
    const item = req.query.q;

    if (item === undefined) {
        res.status(400).json("Bad Request")
    } else {
        let optionsRequestPromise = {
            method: 'GET',
            uri: `${config.apiMercadoLibre}/sites/MLA/search?q=${item}&limit=${numberOfLimitResults}`,
            resolveWithFullResponse: true
        };
        requestPromise(optionsRequestPromise)
            .then(resultQuerySearchItem => {
                //go to map result and get a new object to send to the front

                const bodyRequest = JSON.parse(resultQuerySearchItem.body)

                if (bodyRequest.results.length > 0) {

                    let objectCategories='',
                    arrayCategories=[false];

                    if(bodyRequest.filters.length>0){

                        objectCategories = bodyRequest.filters.find(filter => filter.id === 'category');

                         arrayCategories = objectCategories.values.map(value => disarmCategories(value.path_from_root));
                    }


                    let objectReturn = {
                        author: {
                            name: '',
                            lastname: ''
                        },
                        categories: arrayCategories[0],
                        items: bodyRequest.results.map(item => formatItem(item, false))
                    };


                    res.status(200).json(objectReturn);
                } else {
                    res.status(404).json("Not found")
                }

            })
            .catch(e => res.status(503).json(e))
    }

});

//get information of item
router.get('/items/:id', function (req, res) {
    const id = (req.params.id).replace(/ /g, '');

    if (id === undefined) {
        res.status(400).json("Bad Request")
    } else {

        let optionsFirstPromise = {
            method: 'GET',
            uri: `${config.apiMercadoLibre}/items/${id}`,
            resolveWithFullResponse: true
        };


        requestPromise(optionsFirstPromise)
            .then(principalDataItem => {

                const principalDataItemJson = JSON.parse(principalDataItem.body);

                if (principalDataItem.statusCode === 200) {

                    let dataReturn = formatItem(principalDataItemJson, true),
                        optionsSecondPromiseCategories = {
                            method: 'GET',
                            uri: `${config.apiMercadoLibre}/categories/${principalDataItemJson.category_id}`,
                            resolveWithFullResponse: true
                        },
                        optionsThirdPromiseDescription = {
                            method: 'GET',
                            uri: `${config.apiMercadoLibre}/items/${id}/description`,
                            resolveWithFullResponse: true
                        };


                    requestPromise(optionsSecondPromiseCategories)
                        .then(categoriesItem => {


                            const categoriesItemJson = JSON.parse(categoriesItem.body);

                            dataReturn.categories = disarmCategories(categoriesItemJson.path_from_root);

                            requestPromise(optionsThirdPromiseDescription)
                                .then(descriptionDataItem => {

                                    const descriptionDataJson = JSON.parse(descriptionDataItem.body);

                                    if (descriptionDataItem.statusCode === 200) {

                                        dataReturn.description = descriptionDataJson.plain_text;

                                        res.status(200).json(dataReturn);
                                    } else {
                                        dataReturn.description = false;

                                        res.status(200).json(dataReturn);
                                    }

                                })
                                .catch(e => res.status(503).json(e))

                        })


                } else if (principalDataItem.statusCode === 404) {
                    res.status(404).json("not found")
                }


            })
            .catch(e => res.status(503).json(e))


    }
});

module.exports = router;