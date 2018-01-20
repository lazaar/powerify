/**
 * Created by ilazaar on 08/01/2018.
 */
import logger from 'winston';

module.exports = function(app){

    var features = require('../services/updateFeatures');
    var shopMetafields = require('../services/shopMetafields');

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

};