/**
 * Created by ilazaar on 21/01/2018.
 */

import * as htmlTemplate from './htmlTemplate';
import utilities from './utilities'
import salesPop from './features/salespop'
import exitCoupon from './features/exitCoupon'


const shopify = {
    inAdmin:false,
    inMobile:false,
    isProductPage:false,
    isCartPage:false,
    settings:{},
    moneyFormat:'',
    init : function(){
        if(!window.jQuery)
        {
            utilities.loadScript("https://code.jquery.com/jquery-3.2.1.min.js", this.initFeatures);
        }
        else {
            this.initFeatures();
        }

    },

    initFeatures : function(){
        var self = this;

        self.inAdmin = $("#admin_bar_iframe").length > 0;
        self.inMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        self.isProductPage = window.location.pathname.indexOf("/products/") !== -1;
        self.isCartPage = window.location.pathname.indexOf("/cart") !== -1;

        self.initBarTop();
        self.initBuyMe();

        $.ajax({
            type: "get",
            dataType: "json",
            url: "/index?view=powerify.settings",
            success: function(result){
                self.settings = JSON.parse(result.settings);
                self.moneyFormat = result.moneyFormat;
                self.loadScript();
                if(self.settings.salespop && ((self.settings.salespop.enableDesktop && !self.inMobile) || (self.settings.salespop.enableMobile && self.inMobile))){
                    salesPop.init(self.isProductPage, self.settings.salespop);
                }
            },
            error: function(e) {
                console.log("error Gettings Settings",e);
            }
        });

    },

    loadScript: function(){
        if(!shopify.inMobile) {
            utilities.loadScript("https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js",function () {
                if(shopify.settings.quickview && shopify.settings.quickview.enable){
                    shopify.initQuickView();
                }
                if(shopify.settings.exitCoupon && shopify.settings.exitCoupon.enableDesktop){
                    exitCoupon.init(shopify.isProductPage, shopify.isCartPage, shopify.settings.exitCoupon);
                }
            });
        }
    },

    initBarTop : function(){
        var upperBar =$(".powerify_upper_bar");
        if(upperBar.length > 0){
            upperBar.animate({height: '40px'},300);
            if(this.inAdmin){
                $('body').addClass("inAdmin");
            }
            $('html').animate({paddingTop: this.inAdmin ? '80px' : '40px'},500);
        }
    },

    initBuyMe : function(){
        var buyme =$(".powerify_add_to_card");
        $(window).scroll(function() {if (window.location.href.indexOf('/products/') > -1 && $(window).scrollTop() > 400 ){ $('.buybuy').addClass('show');} else {$('.buybuy').removeClass('show');};});

    },

    initQuickView : function(){
        var SELECTORS_LINK = 'a[href*="/products/"]:not([href*=".jp"]):not([href*=".JP"]):not([href*=".png"]):not([href*=".PNG"])';
        var SELECTORS_IMAGE = 'img[src*="/products/"],img[data-srcset*="/products/"]';

        var products = $(SELECTORS_LINK).has(SELECTORS_IMAGE).parent();
        products.addClass("powerify-quickview-wrapper");

        if(products.length > 0){
            products.each(function(){
                //var button = $();
                var productID = $(this).find(SELECTORS_LINK).attr("href").replace('/products/','');
                $(this).append('<div class="powerify-quickview-button-wrapper" ><a class="powerify-quickview-button" id="'+productID+'" href="#'+productID+'-modal">Quick View</a></div>');
                $(this).append(htmlTemplate.quickViewModal.replace("{{productID}}", productID));

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
                                    var html = content.html().replace("{{image}}", result.images[0])
                                        .replace("{{title}}", result.title)
                                        .replace("{{description}}", result.description);
                                    content.html(html);
                                    modal.removeClass("powerify-inLoad");
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

shopify.init();
