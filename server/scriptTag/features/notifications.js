/**
 * Created by ilazaar on 22/01/2018.
 */

import push from 'push.js';
import utilities from '../utilities';
import currencyConverter from './currencyConverter';

const notifications = {
    settings : {},
    products:[],
    cartCount:0,
    country:'',
    init: function (settings) {
        notifications.settings = settings;
        notifications.settings.showOnlyHidden = settings.showOnlyHidden[0] === 'true';
        notifications.settings.maxTime = parseInt(notifications.settings.maxTime);
        notifications.settings.minTime = parseInt(notifications.settings.minTime);

        if(notifications.settings.messages.indexOf('{cartCount}') !== -1){
            notifications.initCountCart();
        }
        if(notifications.settings.messages.indexOf('{productTitle}') !== -1){
            utilities.getProducts((result)=>{
                notifications.products = result;
            });
        }
        if(notifications.settings.messages.indexOf('{country}') !== -1){
            notifications.country =currencyConverter.getCountry();
        }

        notifications.settings.messages = settings.messages.split(";");
        notifications.settings.initialMessages = notifications.settings.messages;
        notifications.launchNotif(this.settings.minTime);
    },

    initCountCart : function() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: "/cart.js",
            success: function(result){
                notifications.cartCount = result.items.length;
            },
            error: function(e) {
                console.log("error Gettings cart",e);
            }
        });
    },
    getRandomTime : function() {
        return Math.floor(Math.random() * (this.settings.maxTime - this.settings.minTime + 1)) + this.settings.minTime;
    },
    launchNotif : function (timeOut){
        setTimeout(function () {
            var messageIndex = Math.floor(Math.random()*notifications.settings.messages.length);
            var message = notifications.settings.messages[messageIndex];
            var icon = '';
            var productLink = '';
            if(message.indexOf('{cartCount}') !== -1 && notifications.cartCount !== 0 ){
                message = message.replace('{cartCount}',notifications.cartCount);
                productLink = '/cart';
            }
            else if(message.indexOf('{productTitle}') !== -1 && notifications.products.length > 0){
                var product = notifications.products[Math.floor(Math.random()*notifications.products.length)];
                message = message.replace('{productTitle}',product.title);
                icon = product.images[0].src;
                productLink = '/products/'+product.handle;
            }
            else if(message.indexOf('{country}') !== -1 && notifications.country.length > 0){
                message = message.replace('{country}',notifications.country);
            }

            notifications.settings.messages.splice(messageIndex,1);

            if(notifications.settings.messages.length === 0 && notifications.settings.loop){
                notifications.settings.messages = notifications.settings.initialMessages;
            }
            if(!notifications.settings.showOnlyHidden || document.hidden){
                if( message.indexOf('{productTitle}') === -1 && message.indexOf('{cartCount}') === -1 && message.indexOf('{country}') === -1){
                    push.create(message, {
                        icon: icon,
                        timeout: 4000,
                        vibrate:[200, 100],
                        onClick: function () {
                            if(productLink !== ''){
                                window.location.href = productLink;
                            }
                            window.focus();
                            this.close();
                        }
                    });
                }
            }
            if(notifications.settings.messages.length !== 0){
                notifications.launchNotif(notifications.getRandomTime());
            }

        },timeOut*60000);
    }
    
};

export default notifications;
