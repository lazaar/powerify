/**
 * Created by ilazaar on 22/01/2018.
 */

import Noty from 'noty';

const salesPop = {
    settings : {},
    products:[],
    isProductPage:false,
    init: function (isProductPage, settings) {
        salesPop.isProductPage = isProductPage;
        salesPop.settings = settings;
        salesPop.settings.showOnProduct = settings.showOnProduct[0] === 'true';
        salesPop.settings.showCurrentProduct = settings.showCurrentProduct[0] === 'true';
        salesPop.settings.locations = settings.locations.split(";");

        if(salesPop.isProductPage && salesPop.settings.showCurrentProduct){
            $.ajax({
                type: "get",
                dataType: "json",
                url: window.location.pathname + ".js",
                success: function(element){
                    if(salesPop.settings.excludeProducts.indexOf(element.id) === -1){
                        salesPop.products.push(element);
                    }
                    salesPop.initNotifs();
                },
                error: function(e) {
                    console.log("error Gettings product",e);
                }
            });
        }
        else{
            $.ajax({
                type: "get",
                dataType: "json",
                url: "/products.json",
                success: function(result){
                    result.products.forEach(function(element) {
                        if(salesPop.settings.excludeProducts.indexOf(element.id) === -1){
                            salesPop.products.push(element);
                        }
                    });
                    salesPop.initNotifs();
                },
                error: function(e) {
                    console.log("error Gettings Products",e);
                }
            });
        }
    },
    
    initNotifs: function () {
        if(salesPop.products.length === 0 || (salesPop.settings.showOnProduct && !salesPop.isProductPage)){
            return;
        }
        this.launchNotif(0);
    },

    getRandomTime : function() {
        return Math.floor(Math.random() * (this.settings.maxTime - this.settings.minTime + 1)) + this.settings.minTime;
    },
    launchNotif : function (timeOut){
        setTimeout(function () {
            var product, productImage;
            if(salesPop.isProductPage && salesPop.settings.showCurrentProduct){
                product = salesPop.products[0];
                productImage = product.images[0];
            }
            else{
                product = salesPop.products[Math.floor(Math.random()*salesPop.products.length)];
                productImage = product.images[0].src;
            }

            var location = salesPop.settings.locations[Math.floor(Math.random()*salesPop.settings.locations.length)];
            var text= salesPop.settings.textTemplate.replace("{{location}}",location).replace("{{product}}", product.title);
            if(!document.hidden){
                new Noty({
                    text: '<img src="'+productImage+'"/><span class="powerify-noty-content">'+text+'</span>',
                    type:salesPop.settings.color,
                    layout:salesPop.settings.position,
                    theme:'bootstrap-v3',
                    timeout:salesPop.settings.timeout===0 ? false : salesPop.settings.timeout*1000
                }).show();
            }
            salesPop.launchNotif(salesPop.getRandomTime());
        },timeOut*1000);
    }
    
};

export default salesPop;
