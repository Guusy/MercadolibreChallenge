const config = require("../config/configFile");

const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');
const accessTokenMercadolibre= 'APP_USR-8465775776257699-030310-f0c776fe9c385bd2c0db11f4c684af56__M_G__-192554493';

const parsePrice = (amount,currency) =>{

   let arrayAmount=amount.toString().split(".");


    return{
        currency:currency,
        amount:arrayAmount[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
        decimals:(arrayAmount[1]===undefined) ? '00':arrayAmount[1]
    }
};

const formatItem =  (arrayToGetData,picture) =>{

    return{
    author:{
        name: '',
        lastname: ''
    },
        id: arrayToGetData.id,
        title: arrayToGetData.title,
        price: parsePrice(arrayToGetData.price,arrayToGetData.currency_id),
        picture: (picture) ? arrayToGetData.pictures[0].url : arrayToGetData.thumbnail,
        condition: arrayToGetData.condition,
        sold_quantity:arrayToGetData.sold_quantity,
        free_shipping: arrayToGetData.shipping.free_shipping

    }
};

const disarmCategories = (arrayCategories) =>arrayCategories.map(category=> category.name);


router.get('/items', function (req, res) {
    const item = req.query.q;
    
    if (item === undefined) {
        res.status(400).json("Bad Request")
    } else {
        let optionsRequestPromise = {
            method: 'GET',
            uri: `${config.apiMercadoLibre}/sites/MLA/search?q=${item}`,
            resolveWithFullResponse: true
        }
        requestPromise(optionsRequestPromise)
            .then(resultQuerySearchItem => {
                //go to map result and get a new object to send to the front 
                if (resultQuerySearchItem.statusCode === 200) {
                    const bodyRequest = JSON.parse(resultQuerySearchItem.body)
                    
                    let objectCategories = bodyRequest.filters.find(filter => filter.id === 'category');

                    let arrayCategories = objectCategories.values.map(value =>disarmCategories(value.path_from_root));

                    let objectReturn = {
                        author: {
                            name: '',
                            lastname: ''
                        },
                        categories: arrayCategories[0],
                        items :bodyRequest.results.map(item => formatItem(item,false))
                    };

                    
                    res.status(200).json(objectReturn);
                } else {
                    res.status(404).json("Not found")
                }

            })
            .catch(e => res.status(503).json(e))
    }

});
router.get('/items/:id', function (req, res) {
    const id = (req.params.id).replace(/ /g,'');

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

                    console.log("works")
                    let dataReturn =formatItem(principalDataItemJson,true),
                        optionsSecondPromiseCategories ={
                        method: 'GET',
                        uri: `${config.apiMercadoLibre}/categories/${principalDataItemJson.category_id}`,
                        resolveWithFullResponse: true
                    },
                        optionsThirdPromiseDescription = {
                        method: 'GET',
                        uri: `${config.apiMercadoLibre}/items/${id}/description`,
                        resolveWithFullResponse: true
                    };
                    console.log("works2")

                    requestPromise(optionsSecondPromiseCategories)
                        .then(categoriesItem => {


                            const categoriesItemJson = JSON.parse(categoriesItem.body);

                            dataReturn.categories = disarmCategories(categoriesItemJson.path_from_root);

                            requestPromise(optionsThirdPromiseDescription)
                                .then(descriptionDataItem => {

                                    const descriptionDataJson = JSON.parse(descriptionDataItem.body);

                                    if (descriptionDataItem.statusCode === 200) {

                                        dataReturn.description= descriptionDataJson.plain_text;

                                        console.log('404 description dataToReturn',dataReturn)
                                        res.status(200).json(dataReturn);
                                    } else {
                                        console.log('200 all data find dataToReturn',dataReturn)
                                        res.status(200).json(dataReturn);
                                    }

                                })
                                .catch(e => res.status(503).json(e))

                        })





                    
                } else if(principalDataItem.statusCode===404){
                    res.status(404).json("not found")
                }


            })
            .catch(e => res.status(503).json(e))


    }
});

module.exports = router;