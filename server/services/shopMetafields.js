/**
 * Created by ilazaar on 16/01/2018.
 */

import logger from 'winston';

const shopMetafield = {
    save: function(shopify, key, value) {
        var promise = new Promise((resolve, reject) =>
        {
            shopify.metafield.list().then(metafields => {
                let alreadyExist = -1;
                metafields.every(function(metafield) {
                    if (metafield.namespace === "powerify" && metafield.key === key){
                        alreadyExist = metafield.id;
                        return false;
                    }
                    else{
                        return true;
                    }
                });
                if(value===""){
                    logger.info("delete Metafieald");
                    shopify.metafield.delete(alreadyExist).then(resolve).catch(reject);
                }
                else if (alreadyExist !== -1){
                    logger.info("Update Metafieald");
                    shopify.metafield.update(alreadyExist, {value: value }).then(resolve).catch(reject);
                }
                else{
                    logger.info("Create Metafieald");
                    shopify.metafield.create({
                        namespace: 'powerify',
                        key: key,
                        value: value,
                        value_type: 'string'
                    }).then(resolve).catch(reject);
                }
            });

        });
        return promise;
    }
};

module.exports = shopMetafield;