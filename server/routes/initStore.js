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
        if(value.indexOf("{% include 'powerify-init-body' %}") === -1){
            value = value.replace("</body>", "{% include 'powerify-init-body' %}</body>")
                .replace("</head>", "{% include 'powerify-init-head' %}</head>");
            shopify.asset.update(theme.id, {
                key: 'layout/theme.liquid',
                value:  value
            }).then(() => {
                logger.info("Modifying theme.liquid");
            }).catch((e) => {
                logger.error("Error on Modifying theme.liquid",e);
            });
        }
    });

    shopify.asset.create(theme.id,{ key: 'templates/index.powerify.settings.liquid' ,src:APP_URL+"/addToTheme/index.powerify.settings.liquid"}).then((e) => {
        logger.info("Create new view for settings",e);
     }).catch((e) => {
        logger.info("erro on creating new view for settings", e);
     });

     shopify.asset.create(theme.id,{ key: 'templates/product.powerify.settings.liquid' ,src:APP_URL+"/addToTheme/product.powerify.settings.liquid"}).then((e) => {
        logger.info("Create new product view for settings",e);
     }).catch((e) => {
        logger.info("erro on creating new product view for settings", e);
     });

     shopify.asset.create(theme.id,{ key: 'snippets/powerify-init-head.liquid' ,src:APP_URL+"/addToTheme/powerify-init-head.liquid"}).then((e) => {
        logger.info("Create init Snippets",e);
    }).catch((e) => {
        logger.info("Error on Creating init Snippets", e);
    });

    shopify.asset.create(theme.id,{ key: 'snippets/powerify-init-body.liquid' ,src:APP_URL+"/addToTheme/powerify-init-body.liquid"}).then((e) => {
        logger.info("Create init Snippets",e);
    }).catch((e) => {
        logger.info("Error on Creating init Snippets", e);
    });

    shopify.asset.create(theme.id,{ key: 'assets/powerify.css' ,src:APP_URL+"/addToTheme/powerify.css"}).then((e) => {
        logger.info("Create Css File",e);
    }).catch((e) => {
        logger.info("Error on Creating Css File", e);
    });
}


