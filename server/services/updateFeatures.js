/**
 * Created by ilazaar on 10/01/2018.
 */
import logger from 'winston';
import * as htmlConstants from '../constants/htmlTemplate';

var shopMetafields = require('./shopMetafields');

const features = {
    init: function(settings, shopify) {
        settings = JSON.parse(settings);
        Object.keys(settings).forEach(function (tabName) {
            let tabSettings = settings[tabName];
            if(tabs[tabName] && typeof tabs[tabName].init === "function"){
                tabs[tabName].init(tabSettings, shopify);
            }
        });

    }
};

const tabs = {};
tabs.upperBar = {
    init: function(tabSettings, shopify) {
        let upperbar = "";
        if(tabSettings.enable){
            upperbar = htmlConstants.upperBar.replace("{{text}}", tabSettings.text)
                .replace("{{color}}",tabSettings.colorText )
                .replace("{{backgroundColor}}",tabSettings.bg_colorText )
                .replace("{{font}}",tabSettings.font );
        }
        logger.info("Init upperBar", upperbar);
        shopMetafields.save(shopify,"upperBar",upperbar ).then(() => {
            logger.info("upperBar saved");
        }).catch((e)=>{
            logger.error("upperBar not saved",e);
        });
    }
};

module.exports = features;