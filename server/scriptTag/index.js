/**
 * Created by ilazaar on 21/01/2018.
 */

import * as htmlTemplate from './htmlTemplate';
import utilities from './utilities'

const shopify = {
    inAdmin:false,
    inMobile:false,
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
        self.initBarTop();
        self.initBuyMe();

        $.ajax({
            type: "get",
            dataType: "json",
            url: "/index?view=powerify.settings",
            success: function(result){
                self.settings = JSON.parse(result.settings);
                console.log(self.settings);
                self.moneyFormat = result.moneyFormat;
                self.loadScript();
            },
            error: function(e) {
                console.log("error Gettings Settings",e);
            }
        });

    },

    loadScript: function(){
        if(!this.inMobile && this.settings.quickview.enable) {
            utilities.loadScript("https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js",this.initQuickView);
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
        if(buyme.length > 0){

            //$('html').css('padding-top',inAdmin === "" ? '40px' : '80px');
            buyme.animate({height: '70px'},300);
        }
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
