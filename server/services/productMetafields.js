/**
 * Created by ilazaar on 16/01/2018.
 */

import logger from 'winston';

const productMetafield = {
    save: function(shopify, key, value, productId) {
        var promise = new Promise((resolve, reject) =>
        {
            shopify.metafield.list({
                metafield: { owner_resource: 'product', owner_id: productId }
            }).then(metafields => {
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
                    logger.info("delete Product Metafieald");
                    shopify.metafield.delete(alreadyExist).then(resolve).catch(reject);
                }
                else if (alreadyExist !== -1){
                    logger.info("Update Product Metafieald");
                    shopify.metafield.update(alreadyExist, {value: value }).then(resolve).catch(reject);
                }
                else{
                    logger.info("Create Product Metafieald");
                    shopify.metafield.create({
                        namespace: 'powerify',
                        key: key,
                        value: value,
                        value_type: 'string',
                        owner_resource: 'product',
                        owner_id: productId
                    }).then(resolve).catch(reject);
                }
            });

        });
        return promise;
    }
};

module.exports = productMetafield;