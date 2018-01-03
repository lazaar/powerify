import logger from 'winston';
import {
  APP_URL
} from '../config';

/**
 * Init Store 
 * @param shopify object
 */
export const init = shopify => {
  initScriptTag(shopify);
};


/**
* Init ScriptTag
* @param shopify object
*/
export const initScriptTag = shopify => {
  const scriptTagLink = APP_URL +'/scriptTag/index.js';
  shopify.scriptTag.list().then(scriptsTag => {
    let alreadyExist = false;
    scriptsTag.every(function(scriptsTag) {
          if (scriptsTag.src === scriptTagLink){
            alreadyExist = true;
            logger.info("scriptTag Already exist");
            return false;
          }
          else{
            return true;
          }
    });
    if (!alreadyExist){
      shopify.scriptTag.create({
          "event": "onload",
          "src": scriptTagLink
        }).then(() => {
          logger.info("scriptTag Added");
      });
    }
  });

};



