const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');
const accessTokenMercadolibre= 'APP_USR-8465775776257699-030118-bed21d9398f3742d1db6e6c3990b4852__B_J__-192554493';


const formatItem =  (arrayToGetData) =>{
    return{
    author:{
        name: '',
        lastname: ''
    },
        id: arrayToGetData.id,
        title: arrayToGetData.title,
        price: {
            currency: arrayToGetData.currency_id,
            amount: arrayToGetData.price,
            decimals: 0.0
        },
        picture: arrayToGetData.pictures[0].url,
        condition: arrayToGetData.condition,
        sold_quantity:arrayToGetData.sold_quantity,
        free_shipping: arrayToGetData.shipping.free_shipping

    }
}

router.get('/items', function (req, res) {
    const item = req.query.q
    
    if (item === undefined) {
        res.status(400).json("Bad Request")
    } else {
        let optionsRequestPromise = {
            method: 'GET',
            uri: `https://api.mercadolibre.com/sites/MLA/search?q=${item}&access_token=${accessTokenMercadolibre}`,
            resolveWithFullResponse: true
        }
        requestPromise(optionsRequestPromise)
            .then(resultQuerySearchItem => {
                //go to map result and get a new object to send to the front 
                if (resultQuerySearchItem.statusCode === 200) {
                    const bodyRequest = JSON.parse(resultQuerySearchItem.body)
                    
                    let objectCategories = bodyRequest.filters.find(filter => filter.id === 'category')
                    let arrayCategories = objectCategories.values.map(value => {
                        let arrayCategoriesToReturn = value.path_from_root.map(paths => paths.name);
                        arrayCategoriesToReturn.push(value.name)
                        return arrayCategoriesToReturn
                    })
                    let objectReturn = {
                        author: {
                            name: '',
                            lastname: ''
                        },
                        categories: arrayCategories[0]
                    }
                    let arrayItemsToFront = bodyRequest.results.map(item => {
                        let returnItem = {
                            id: item.id,
                            title: item.title,
                            price: {
                                currency: item.currency_id,
                                amount: item.price,
                                decimals: 0.0
                            },
                            picture: item.thumbnail,
                            condition: item.condition,
                            free_shipping: item.shipping.free_shipping

                        }


                        return returnItem
                    })


                    objectReturn.items =arrayItemsToFront;
                    
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
    console.log(id)
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


                const principalDataItemJson = JSON.parse(principalDataItem.body)

                if (principalDataItem.statusCode === 200) {

                    let dataReturn =formatItem(principalDataItemJson)

                    let optionsSecondPromise = {
                        method: 'GET',
                        uri: `https://api.mercadolibre.com/items/${id}/description`,
                        resolveWithFullResponse: true
                    };



                    requestPromise(optionsSecondPromise)
                        .then(descriptionDataItem => {


                            const descriptionDataJson = JSON.parse(descriptionDataItem.body);

                            if (descriptionDataItem.statusCode === 200) {

                                dataReturn.description= descriptionDataJson.plain_text;

                                console.log('dataToReturn',dataReturn)
                                res.status(200).json(dataReturn);
                            } else {
                                res.status(200).json(JSON.parse({
                                    principalData: principalDataItem.body
                                }));
                            }

                        })
                        .catch(e => res.status(503).json(e))

                    
                } else if(principalDataItem.statusCode===404){
                    res.status(404).json("not found")
                }


            })
            .catch(e => res.status(503).json(e))


    }
});

module.exports = router;