/**
 * Created by ilazaar on 22/01/2018.
 */
import * as htmlTemplate from '../htmlTemplate';
import _ from 'lodash';
import currencyConverter from './currencyConverter';

const upsell = {
    moneyFormat:"",
    init: function (settings, productSettings) {
        if(!productSettings || productSettings.disable){
            return;
        }

        var productHtml ="";
        var numberCall = 0;
        productSettings.products.forEach((product, index) => {
            $.ajax({
                type: "get",
                dataType: "json",
                url: "/products/" + product.handle + ".js",
                success: function (result) {
                    productHtml += upsell.getHtmlForProductItem(result, index, settings);
                    if(++numberCall === productSettings.products.length){
                        upsell.initHtml(productSettings, productHtml);
                    }
                },
                error:function(){
                    if(++numberCall === productSettings.products.length){
                        upsell.initHtml(productSettings, productHtml);
                    }
                }
            });
        });

        this.overlaySubmitBtn(settings);

    },

    initHtml: function (productSettings, productHtml) {

        var upsellElt = $("#powerify-upsell");

        upsellElt.children(".powerify-upsell-products").html(productHtml);
        if(productSettings.title){
            upsellElt.children(".powerify-upsell-title").html(productSettings.title);
        }
        if(productSettings.subtitle){
            upsellElt.children(".powerify-upsell-subtitle").html(productSettings.subtitle);
        }



        this.addEvents(productSettings);

    },

    getHtmlForProductItem: function(product, index, settings){
        var variations = "", price = "";
        var variationsArray = _.get(product,'variants',[]);
        if(variationsArray.length === 1){
            price = variationsArray[0].price;
            variations ="<input type='hidden' value='"+variationsArray[0].id+"' name='id'/>"
        }
        else if(variationsArray.length !== 0){
            variations += "<select data-product='"+index+"' name='id'>";
            variationsArray.forEach((variation) => {
                variations += "<option value='"+variation.id+"'>" + variation.title + "</option>";
            });
            variations += "</select>";
            price = variationsArray[0].price;
        }

        return htmlTemplate.upSellItem.replace("{{title}}",product.title)
            .replace("{{imageSrc}}",product.images[0])
            .replace("{{href}}",product.handle)
            .replace("{{variations}}",variations)
            .replace("{{price}}",currencyConverter.getNewPrice(Shopify.formatMoney(price,"{{amount}}")))
            .replace("{{btnColor}}",settings.addToCartColor)
            .replace("{{priceColor}}",settings.priceColor)
            .replace("{{priceFontSize}}",settings.priceFontSize)
            .replace("{{btnBgColor}}",settings.btnBackgroundColor)
            .replace("{{addToCartText}}",settings.addToCartText);
    },

    addEvents: function (productSettings) {
        $('.powerify-upsell-product-variations').children("select").on("change", function () {
            var productItem = $(this).closest(".powerify-upsell-product");

            var variations = _.get(productSettings.products[$(this).data('product')],'variants',[]);
            var currentVariation = variations[$(this).prop('selectedIndex')];
            productItem.find(".powerify-upsell-product-price").html(currencyConverter.getNewPrice(Shopify.formatMoney(currentVariation.price,"{{amount}}")));
        });
    },

    overlaySubmitBtn: function (settings) {
        $('form[action="/cart/add"]:not(".powerify-insidePopup")').on("submit", function (e) {
            e.preventDefault();
            $(this).ajaxSubmit();
            $.fancybox.open({
                src  : '#powerify-upsell',
                type : 'inline',
                opts : {
                    baseClass : 'powerify-exitcoupon-modal'
                }
            });
        });

        $('.powerify-insidePopup').on("submit", function (e) {
            e.preventDefault();
            var errorElemment = $(this).find(".powerify-result-message");
            errorElemment.html("");
            $(this).ajaxSubmit({
                success: function () {
                    errorElemment.html(settings.successMessage);
                }
            });
        });
    }

    
};

export default upsell;
