/**
 * Created by ilazaar on 08/01/2018.
 */
import logger from 'winston';
import {
    APP_URL
} from '../config';

module.exports = function(app){

    app.get('/v1/api/isFileAdded', function(req, res){
        const { shopify } = req;

        shopify.theme.list().then(themes => {
            var theme = themes.find(function(element) {
                return element.role == "main";
            });

            var index = shopify.asset.get(theme.id, {  asset: {key: 'templates/index.powerify.settings.liquid'}, theme_id: theme.id});
            var product = shopify.asset.get(theme.id, {  asset: {key: 'templates/product.powerify.settings.liquid'}, theme_id: theme.id});
            var head = shopify.asset.get(theme.id, {  asset: {key: 'snippets/powerify-init-head.liquid'}, theme_id: theme.id});
            var body = shopify.asset.get(theme.id, {  asset: {key: 'snippets/powerify-init-body.liquid'}, theme_id: theme.id});
            var css = shopify.asset.get(theme.id, {  asset: {key: 'assets/powerify.css'}, theme_id: theme.id});
            var productSnippets = shopify.asset.get(theme.id, {  asset: {key: 'snippets/powerify-product-init.liquid'}, theme_id: theme.id});

            Promise.all([index, product, head, body, css, productSnippets]).then(function(values) {
                if(values.length === 6){
                    res.status(200).json({code:200});
                }
                else{
                    res.status(500).json({code:500});
                }
            }).catch(function() {
                res.status(500).json({code:500});
            });

        }).catch(function() {
            res.status(404).json({code:404});
        });


    });


    app.get('/v1/api/addFiles', function(req, res){
        const { shopify } = req;

        shopify.theme.list().then(themes => {
            var theme = themes.find(function(element) {
                return element.role == "main";
            });

            var index = shopify.asset.create(theme.id, {
                key: 'templates/index.powerify.settings.liquid',
                src: APP_URL + "/addToTheme/index.powerify.settings.liquid"
            });

            var product = shopify.asset.create(theme.id, {
                key: 'templates/product.powerify.settings.liquid',
                src: APP_URL + "/addToTheme/product.powerify.settings.liquid"
            });

            var head = shopify.asset.create(theme.id, {
                key: 'snippets/powerify-init-head.liquid',
                src: APP_URL + "/addToTheme/powerify-init-head.liquid"
            });

            var body = shopify.asset.create(theme.id, {
                key: 'snippets/powerify-init-body.liquid',
                src: APP_URL + "/addToTheme/powerify-init-body.liquid"
            });

            var css = shopify.asset.create(theme.id, {
                key: 'assets/powerify.css',
                src: APP_URL + "/addToTheme/powerify.css"
            });

            var productSnippets = shopify.asset.create(theme.id, {
                key: 'snippets/powerify-product-init.liquid',
                src: APP_URL + "/addToTheme/powerify-product-init.liquid"
            });


            Promise.all([index, product, head, body, css, productSnippets]).then(function(values) {
                if(values.length === 6){
                    res.status(200).json({code:200});
                }
                else{
                    res.status(500).json({code:500});
                }
            }).catch(function() {
                res.status(500).json({code:500});
            });

        }).catch(function() {
            res.status(404).json({code:404});
        });


    });

    
    app.get('/v1/api/isThemeUpdated', function(req, res){
        const { shopify } = req;

        shopify.theme.list().then(themes => {
            var theme = themes.find(function(element) {
                return element.role == "main";
            });

            shopify.asset.get(theme.id, {
                asset: {key: 'layout/theme.liquid'},
                theme_id: theme.id
            }).then((e) => {
                var value = e.value;
                if (value.indexOf("{% include 'powerify-init-body' %}") === -1) {
                    res.status(500).json({code:500});
                }
                else{
                    shopify.asset.get(theme.id, {
                        asset: {key: 'sections/product-template.liquid'},
                        theme_id: theme.id
                    }).then((e) => {
                        var value = e.value;
                        if (value.indexOf("{% include 'powerify-product-init' %}") === -1) {
                            res.status(500).json({code:500});
                        }
                        else{
                            res.status(200).json({code:200});
                        }
                    }).catch(function() {
                        res.status(404).json({code:404});
                    });
                }
            }).catch(function() {
                res.status(404).json({code:404});
            });
        }).catch(function() {
            res.status(404).json({code:404});
        });
    });

    app.get('/v1/api/updateTheme', function(req, res){
        const { shopify } = req;

        shopify.theme.list().then(themes => {
            var theme = themes.find(function(element) {
                return element.role == "main";
            });

            /** Update Theme.liquid **/
            shopify.asset.get(theme.id, {
                asset: {key: 'layout/theme.liquid'},
                theme_id: theme.id
            }).then((e) => {
                var value = e.value;
                if (value.indexOf("{% include 'powerify-init-body' %}") === -1) {
                    value = value.replace("</body>", "{% include 'powerify-init-body' %}</body>")
                        .replace("</head>", "{% include 'powerify-init-head' %}</head>");
                    shopify.asset.update(theme.id, {
                        key: 'layout/theme.liquid',
                        value: value
                    }).then(() => {
                        logger.info("Modifying theme.liquid");
                    }).catch((e) => {
                        logger.error("Error on Modifying theme.liquid", e);
                    });
                }
            });

            /** Update product-template.liquid **/
            shopify.asset.get(theme.id, {
                asset: {key: 'sections/product-template.liquid'},
                theme_id: theme.id
            }).then((e) => {
                var value = e.value;
                if (value.indexOf("{% include 'powerify-product-init' %}") === -1) {
                    value += "{% include 'powerify-product-init' %}";

                    shopify.asset.update(theme.id, {
                        key: 'sections/product-template.liquid',
                        value: value
                    }).then(() => {
                        logger.info("Modifying product-template.liquid");
                    }).catch((e) => {
                        logger.error("Error on Modifying product-template.liquid", e);
                    });
                }
            });

            res.status(200).json({code:200});

        }).catch(function() {
            res.status(404).json({code:404});
        });


    });

};