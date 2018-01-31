/**
 * Created by ilazaar on 08/01/2018.
 */
import logger from 'winston';
import shopMetafields from '../services/shopMetafields';
import productMetafields from '../services/productMetafields';
import features from '../services/updateFeatures';

module.exports = function(app){

    app.get('/v1/api/settings', function(req, res){
        const { shopify } = req;
        console.log("get Settings");
        shopify.metafield.list().then(metafields => {
            let settings = {};
            metafields.every(function(metafield) {
                if (metafield.namespace === "powerify" && metafield.key === "settings"){
                    settings = metafield;
                    return false;
                }
                else{
                    return true;
                }
            });
            if(settings.value){
                res.status(200).json(settings);
            }
            else{
                res.status(302).json(settings);
            }


        });
    });

    app.post('/v1/api/settings', function(req, res){
        const { shopify } = req;

        shopMetafields.save(shopify,"settings",JSON.stringify(req.body)).then((e) => {
            features.init(JSON.stringify(req.body), shopify);
            logger.info("Metafieald saved");
            res.status(200).json(JSON.parse(e.value));
        }).catch((e)=>{
            logger.error("Metafieald not saved");
            res.status(500).send(e);
        });

    });

    app.get('/v1/api/product', function(req, res){
        const { shopify } = req;
        shopify.metafield.list(
        {
            metafield: { owner_resource: 'product', owner_id: req.query.productId }
        }).then(metafields => {
            let settings = {};
            metafields.every(function(metafield) {
                if (metafield.namespace === "powerify" && metafield.key === "settings"){
                    settings = metafield;
                    return false;
                }
                else{
                    return true;
                }
            });
            if(settings.value){
                res.status(200).json(settings);
            }
            else{
                res.status(302).json(settings);
            }


        });
    });

    app.post('/v1/api/product', function(req, res){
        const { shopify } = req;
        var productId = parseInt(req.body.productId);
        productMetafields.save(shopify,"settings",JSON.stringify(req.body.settings), productId ).then((e) => {
            logger.info("Product Metafieald saved");
            res.status(200).json(JSON.parse(e.value));
        }).catch((e)=>{
            logger.error("Product Metafieald not saved",e );
            res.status(500).send(e);
        });

    });

};