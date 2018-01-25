/**
 * Created by ilazaar on 22/01/2018.
 */

import utilities from '../utilities'

const exitCoupon = {
    settings:{},
    init: function (isProductPage, isCartPage, settings) {
        if(settings.onlyOnCart && !isCartPage && !isProductPage){
            return;
        }
        this.settings = settings;
        this.settings.onlyOnNotEmptyCart = settings.onlyOnNotEmptyCart[0] ==='true';
        this.settings.onlyOnCart = settings.onlyOnCart[0] ==='true';
        this.settings.onlyFirstTime = settings.onlyFirstTime[0] ==='true';

        if(this.settings.onlyOnNotEmptyCart){
            $.ajax({
                type: "get",
                dataType: "json",
                url: "/cart.js",
                success: function(result){
                    if(result.items.length > 0){
                        exitCoupon.addEvent();
                    }
                },
                error: function(e) {
                    console.log("error Gettings Cart",e);
                }
            }); 
        }
        else{
            exitCoupon.addEvent();
        }
    },
    addEvent:function () {
        var isOpen = false;
        var callback = utilities.debounce.init(function () {
            if(!isOpen){
                $.fancybox.open({
                    src  : '#powerify-coupon-on-exit',
                    type : 'inline',
                    opts : {
                        baseClass : 'powerify-exitcoupon-modal',
                        afterLoad:function () {
                            isOpen = true;
                        },
                        beforeClose:function () {
                            isOpen = false;
                            console.log();
                            if(exitCoupon.settings.onlyFirstTime){
                                $(document).off('mouseleave');
                                $(document).off('mouseenter');
                            }
                        }
                    }
                });
            }
        }, parseFloat(exitCoupon.settings.delay)*1000);

        $(document).on('mouseleave',callback);
        $(document).on('mouseenter',utilities.debounce.initFromZero);
    }
    
};

export default exitCoupon;
