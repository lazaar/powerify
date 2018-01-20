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
    initTheme(shopify);
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

/**
 * Init Themes
 * @param shopify object
 */
export const initTheme = shopify => {
    shopify.theme.list().then(themes => {
        themes.every(function(theme) {
            initThemeEntry(shopify, theme);
        });
    });

};


function initThemeEntry(shopify, theme){
    shopify.asset.get(theme.id, {
        asset: { key: 'layout/theme.liquid' },
        theme_id:theme.id
    }).then((e) => {
        var value = e.value;
        if(value.indexOf("{{ shop.metafields.powerify.upperBar  }}") === -1){
            value = value.replace("</body>", "{{ shop.metafields.powerify.upperBar  }}</body>");
            shopify.asset.update(theme.id, {
                key: 'layout/theme.liquid',
                value:  value
            }).then(() => {
                logger.info("Add Upper Bar to Template Succes");
            }).catch((e) => {
                logger.error("Error on adding Upper Bar to Template",e);
            });
        }
        if(value.indexOf("{{ shop.metafields.powerify.buyme  }}") === -1){
            value = value.replace("</body>", "{{ shop.metafields.powerify.buyme  }}</body>");
            shopify.asset.update(theme.id, {
                key: 'layout/theme.liquid',
                value:  value
            }).then(() => {
                logger.info("Add BuyMe to Template Succes");
            }).catch((e) => {
                logger.error("Error on adding buy Me to Template",e);
            });
        }
    });
}


