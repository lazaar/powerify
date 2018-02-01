/**
 * Created by ilazaar on 21/01/2018.
 */

import * as htmlTemplate from './htmlTemplate';
import publicIP from 'react-native-public-ip';
import utilities from './utilities'
import salesPop from './features/salespop'
import exitCoupon from './features/exitCoupon'
import productPage from './product';


const shopify = {
    inAdmin:false,
    inMobile:false,
    isProductPage:false,
    isCartPage:false,
    settings:{},
    moneyFormat:'',
    convertionRates:{},
    storeCurrency:'',
    visitorCountry:'',
    visitorCountryCode:'',
    visitorCurrency:'',
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
        self.convertionRates = { USD : 1.5 , MAD : 2 , EUR :  3 };

        self.initBuyMe();
        $.ajax({
            type: "get",
            dataType: "json",
            url: "/index?view=powerify.settings",
            success: function(result){
                self.settings = JSON.parse(result.settings);
                self.moneyFormat = result.moneyFormat;
                self.storeCurrency = result.currency;
                console.log('shopify show off : '+ shopify.storeCurrency); 

                self.loadScript();
                if(self.settings.salespop && ((self.settings.salespop.enableDesktop && !self.inMobile) || (self.settings.salespop.enableMobile && self.inMobile))){
                    salesPop.init(self.isProductPage, self.settings.salespop);
                }
                productPage.init(self.settings);
            },
            error: function(e) {
                console.log("error Gettings Settings",e);
            }
        });
        publicIP().then(ip => {
        console.log(ip);
        var theIpUrl = '';
        theIpUrl = '//usercountry.com/v1.0/json/'+ip+'?token=c7de9d0d1498a09c96e81368b70bf9493f4abcb92ba3c642/';

        $.ajax(
               {
                 url: theIpUrl, 
                 success: function(result){
                    console.log(result)
                    self.visitorCountry = result.country.name;
                    self.visitorCountryCode = result.country['alpha-2'].toLowerCase() ;
                    self.visitorCurrency = result.currency.code;
                    console.log('visitor currency: ' + shopify.visitorCurrency);
                    console.log('hello : ' +shopify.visitorCountry);
                    self.initBarTop();
                    if(shopify.visitorCurrency === shopify.storeCurrency ) {console.log('should not convert : same currency');} else if (shopify.convertionRates[shopify.visitorCurrency] === undefined || shopify.convertionRates[shopify.storeCurrency] === undefined) {console.log('should not convert : Unknown currency'); } else {console.log('should convert');} 
                    
                     $.ajax(
                           {
                             url: 'https://api.fixer.io/latest?base=USD',
                            
                             success: function(result){
                                self.convertionRates = result.rates;
                                self.convertionRates['USD'] = 1.0 ;
                                self.convertionRates['MAD'] = 1.2 ;
                                console.log('switched');
                                console.log(shopify.convertionRates);
                                self.initCurrencyConverter();
                                
                             }
                         }
                        );
                 }
               }
            );

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
        $( '.countryplace' ).append('' + shopify.visitorCountry);
        $('#flagy').attr('class', 'flag  ' + shopify.visitorCountryCode);
        console.log('upper bar popping out')

    },
    initCurrencyConverter : function(){
        
        var initialPrice = parseFloat($("#ProductPrice-product-template").attr("content"));
        console.log('hello initial price: '+initialPrice);
        console.log('convertion for '+ shopify.visitorCurrency +' rate applied : ' + shopify.convertionRates[shopify.visitorCurrency] );
        let convertedPrice = (shopify.convertionRates[shopify.visitorCurrency]*initialPrice / shopify.convertionRates[shopify.storeCurrency]).toFixed(2);
        console.log(convertedPrice);
        $("#ProductPrice-product-template").text(''+convertedPrice +' '+ shopify.visitorCurrency );

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
