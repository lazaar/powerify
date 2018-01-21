/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__htmlTemplate__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities__ = __webpack_require__(2);
/**
 * Created by ilazaar on 21/01/2018.
 */




const shopify = {
    inAdmin:false,
    inMobile:false,
    settings:{},
    moneyFormat:'',
    init : function(){
        if(!window.jQuery)
        {
            __WEBPACK_IMPORTED_MODULE_1__utilities__["a" /* default */].loadScript("https://code.jquery.com/jquery-3.2.1.min.js", this.initFeatures);
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
            __WEBPACK_IMPORTED_MODULE_1__utilities__["a" /* default */].loadScript("https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js",this.initQuickView);
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
                $(this).append(__WEBPACK_IMPORTED_MODULE_0__htmlTemplate__["a" /* quickViewModal */].replace("{{productID}}", productID));

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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const quickViewModal = '<div style="display:none"><div id="{{productID}}-modal" class="powerify-qv-modal powerify-inLoad"><div class="powerify-loader"></div><div class="powerify-content-modal"><img src="{{image}}"/>{{title}} {{description}}</div></div></div>';
/* harmony export (immutable) */ __webpack_exports__["a"] = quickViewModal;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by ilazaar on 16/01/2018.
 */

const utilities = {
    loadScript: function (url, onload) {
        var scriptElt = document.createElement("script");
        scriptElt.src = url;
        if(onload){
            scriptElt.onload = onload;
        }
        document.head.appendChild(scriptElt);
    }
};

/* harmony default export */ __webpack_exports__["a"] = (utilities);

/***/ })
/******/ ]);