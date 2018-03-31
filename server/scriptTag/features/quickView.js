/**
 * Created by ilazaar on 22/01/2018.
 */

import * as htmlTemplate from '../htmlTemplate';
import currencyConverter from './currencyConverter';

const quickView = {
    init: function (settings, userSettings) {
        var SELECTORS_LINK = 'a[href*="/products/"]:not([href*=".jp"]):not([href*=".JP"]):not([href*=".png"]):not([href*=".PNG"])';
        var SELECTORS_IMAGE = 'img[src*="/products/"],img[data-srcset*="/products/"]';

        var products = $(SELECTORS_LINK).has(SELECTORS_IMAGE).parent();
        products.addClass("powerify-quickview-wrapper");

        if(products.length > 0){
            products.each(function(){

                var url = $(this).find(SELECTORS_LINK).attr("href").split("/");
                var productID = url[url.length -1];
                productID = productID.split('?')[0];
                $(this).append('<div class="powerify-quickview-button-wrapper powerify-qv-'+settings.position+'" >' +
                    '<a class="powerify-quickview-button" id="'+productID+'" href="#'+productID+'-modal" style="color:'+settings.QVBtnTxtColorText+'; background-color:'+settings.QVBtnColorText+'">Quick View</a>' +
                    '</div>');
                $(this).append(htmlTemplate.quickViewModal.replace("{{productID}}", productID)
                    .replace("{{viewDetailPageText}}",settings.viewDetailPageText)
                    .replace("{{addToCartText}}",settings.addToCartText));

                $(this).find(".powerify-qv-product-title").css({color:settings.ProductNameColorText});
                $(this).find(".powerify-qv-product-price").css({color:settings.PriceColorText});
                $(this).find(".powerify-qv-buy-panel").children('input[type="submit"]').css({backgroundColor:settings.AToCBtnColorText});
                $("a#"+productID).fancybox({
                    'hideOnContentClick': true,
                    'beforeLoad': function ( links, element ){
                        var modal = $(element.src);
                        if(modal.hasClass("powerify-inLoad")){
                            $.ajax({
                                type: "get",
                                dataType: "json",
                                url: "/products/"+productID+".js",
                                success: function(result){
                                    var content = modal.children(".powerify-content-modal");

                                    var variations = "", price = "";
                                    var variationsArray = _.get(result,'variants',[]);

                                    if(variationsArray.length === 1){
                                        price = variationsArray[0].price;
                                        variations ="<input type='hidden' value='"+variationsArray[0].id+"' name='id'/>"
                                    }
                                    else if(variationsArray.length !== 0){
                                        variations += "<select class='powerify-qv-variations' name='id'>";
                                        variationsArray.forEach((variation) => {
                                            variations += "<option value='"+variation.id+"' data-price='"+variation.price+"'>" + variation.title + "</option>";
                                        });
                                        variations += "</select>";
                                        price = variationsArray[0].price;
                                    }
                                    
                                    price = currencyConverter.getNewPrice(Shopify.formatMoney(price,"{{amount}}"))

                                    var html = content.html().replace("{{image}}", result.images[0])
                                        .replace("{{title}}", result.title)
                                        .replace("{{link}}", result.url)
                                        .replace("{{price}}", price)
                                        .replace("{{variations}}", variations)
                                        .replace("{{description}}", result.description);

                                    content.html(html);
                                    modal.removeClass("powerify-inLoad");

                                    modal.find(".powerify-qv-variations").on("change", function () {
                                        var newPrice = $(this).find(':selected').data('price');
                                        modal.find('.powerify-qv-product-price').html(currencyConverter.getNewPrice(Shopify.formatMoney(newPrice,"{{amount}}")));
                                    });

                                    if(settings.redirect[0] !== 'cart'){
                                        modal.find('form').on("submit", function (e) {
                                            e.preventDefault();
                                            var data = $(this).serialize();
                                            $.post(
                                                '/cart/add',
                                                data,
                                                function(){
                                                    $.fancybox.close();
                                                }
                                            );
                                        });
                                    }
                                },
                                error: function() {
                                    $.fancybox.close();
                                }
                            });
                        }
                    }
                });

            });
        }
    }
    
};

export default quickView;
