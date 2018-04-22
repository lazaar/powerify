/**
 * Created by ilazaar on 21/01/2018.
 */
import utilities from './utilities';
import salesPop from './features/salespop';
import notifications from './features/notifications';
import exitCoupon from './features/exitCoupon';
import quickView from './features/quickView';
import productPage from './product';
import currencyConverter from './features/currencyConverter';

const shopify = {
    inAdmin:false,
    inMobile:false,
    isProductPage:false,
    isCartPage:false,
    settings:{},
    userSettings:{},

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

        if(self.isProductPage){
            self.initBuyMe();
        }
        var callInitBar = $(".powerify-country").length === 0 && $(".powerify-flag").length === 0;
        if(callInitBar){
            self.initBarTop();
        }
        $.ajax({
            type: "get",
            dataType: "json",
            url: "/index?view=powerify.settings",
            success: function(result){
                self.settings = JSON.parse(result.settings);
                self.userSettings.moneyFormat = result.moneyFormat;

                if(!self.settings){
                    return;
                }

                self.loadScript();

                currencyConverter.init(result.currency,result.moneyFormat, self.settings.currencyconverter, (data) => {
                    if(!callInitBar){
                        self.initBarTop(data.visitorCountry, data.visitorCountryCode);
                    }
                });

                if(self.settings.salespop && ((self.settings.salespop.enableDesktop && !self.inMobile) || (self.settings.salespop.enableMobile && self.inMobile))){
                    salesPop.init(self.isProductPage, self.settings.salespop);
                }
                if(self.settings.pushnotifications && self.settings.pushnotifications.enable){
                    notifications.init(self.settings.pushnotifications);
                }
                if(shopify.isProductPage){
                    productPage.init(self.settings);
                }
            },
            error: function(e) {
                console.log("error Gettings Settings",e);
            }
        });
    },

    loadScript: function(){
            utilities.loadScript("https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js",function () {
              if(!shopify.inMobile) {
                if (shopify.settings.quickview && shopify.settings.quickview.enable && !shopify.isCartPage) {
                  quickView.init(shopify.settings.quickview, shopify.userSettings);
                }
                if (shopify.settings.exitCoupon && shopify.settings.exitCoupon.enableDesktop) {
                  exitCoupon.init(shopify.isProductPage, shopify.isCartPage, shopify.settings.exitCoupon);
                }
              }
            });
    },

    initBarTop : function(visitorCountry, visitorCountryCode){
        var upperBar =$(".powerify_upper_bar");
        if(upperBar.length > 0){
            upperBar.animate({height: '40px'},300);
            if(this.inAdmin){
                $('body').addClass("inAdmin");
            }
            $('html').animate({paddingTop: this.inAdmin ? '80px' : '40px'},500);
        }
        $( '.powerify-country' ).append('' + visitorCountry);
        $('.powerify-flag').addClass('powerify-show-flag ' + visitorCountryCode);

    },

    initBuyMe : function(){
        var buyme =$(".powerify-sticky-me");
        var submitButton = $('form[action="/cart/add"]:not(".powerify-insidePopup")').first().find("[type='submit']");
        buyme.children(".powerify-sticky-me-button").on('click', ()=>{
            submitButton.click();
        });
        $(window).scroll(function() {
            if ($(window).scrollTop() > submitButton.offset().top ){
                buyme.addClass('powerify-sticky-me-show');
            } else {
                buyme.removeClass('powerify-sticky-me-show');
            }
        });

    }
};

shopify.init();
