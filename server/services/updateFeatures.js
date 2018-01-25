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
tabs.buyme = {
    init: function(tabSettings, shopify) {

        let buyme = "";
        
        buyme = htmlConstants.buyme.replace("{{callToAction}}", tabSettings.callToAction).replace("{{position}}", tabSettings.position).replace("{{Size}}", tabSettings.Size)
        
        logger.info("Init buyme", buyme);
        shopMetafields.save(shopify,"buyme",buyme ).then(() => {
            logger.info("buyme saved");
        }).catch((e)=>{
            logger.error("buyme not saved",e);
        });
    }

};
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

tabs.exitCoupon = {
    init: function(tabSettings, shopify) {
        let exitCoupon = "";
        if(tabSettings.enableDesktop){
            exitCoupon = htmlConstants.exitCoupons.replace("{{firstColor}}", tabSettings.firstColorText)
                .replace("{{backgroundColor}}",tabSettings.backgroundColorText )
                .replace("{{firstline}}",tabSettings.firstline )
                .replace("{{secondline}}",tabSettings.secondline )
                .replace("{{secondColor}}",tabSettings.secondColorText )
                .replace("{{couponColor}}",tabSettings.couponColorText )
                .replace("{{couponcode}}",tabSettings.couponcode )
                .replace("{{font}}",tabSettings.font );
        }
        logger.info("Init Exit Coupon", exitCoupon);
        shopMetafields.save(shopify,"exitCoupon",exitCoupon ).then(() => {
            logger.info("exitCoupon saved");
        }).catch((e)=>{
            logger.error("exitCoupon not saved",e);
        });
    }
};

module.exports = features;