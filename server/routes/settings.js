/**
 * Created by ilazaar on 08/01/2018.
 */
import logger from 'winston';

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
            console.log(settings);
            if(settings.value){
                console.log("get", settings);
                res.status(200).json(settings);
            }
            else{
                res.status(302).json(settings);
            }


        });
    });

    app.post('/v1/api/settings', function(req, res){
        console.log("post", req.body);
        const { shopify } = req;

        shopify.metafield.list().then(metafields => {
            let alreadyExist = -1;
            metafields.every(function(metafield) {
                if (metafield.namespace === "powerify" && metafield.key === "settings"){
                    alreadyExist = metafield.id;
                    return false;
                }
                else{
                    return true;
                }
            });
            if (alreadyExist !== -1){
                logger.info("Update Metafieald", JSON.stringify(req.body));
                shopify.metafield.update(alreadyExist, {
                    value: JSON.stringify(req.body)
                }).then((e) => {
                    logger.info("Metafieald Updated");
                    res.status(200).send(e);
                });
            }
            else{
                logger.info("Create Metafieald");
                shopify.metafield.create({
                    namespace: 'powerify',
                    key: 'settings',
                    value: JSON.stringify(req.body),
                    value_type: 'string'
                }).then((e) => {
                    logger.info("Metafieald Created",e);
                    res.status(200).json(JSON.parse(e.value));
                }).catch((e)=>{
                    logger.error("Metafieald not Created");
                    res.status(500).send(e);
                });
            }
        });





    });

};