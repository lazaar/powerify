/**
 * Created by ilazaar on 16/01/2018.
 */

const utilities = {
    products:[],
    loadScript: function (url, onload) {
        var scriptElt = document.createElement("script");
        scriptElt.src = url;
        if(onload){
            scriptElt.onload = onload;
        }
        document.head.appendChild(scriptElt);
    },
    debounce:{
        timeout:0,
        init:function(func, wait, immediate) {
          return function() {
              var context = this, args = arguments;
              var later = function() {
                  utilities.debounce.timeout = null;
                  if (!immediate) func.apply(context, args);
              };
              var callNow = immediate && !utilities.debounce.timeout;
              clearTimeout(utilities.debounce.timeout);
              utilities.debounce.timeout = setTimeout(later, wait);
              if (callNow) func.apply(context, args);
          }
        },
        initFromZero:function() {
            clearTimeout(utilities.debounce.timeout);
        }
    },
    getProducts:function (success, error ) {
        if(this.products.length === 0){
            $.ajax({
                type: "get",
                dataType: "json",
                url: "/products.json",
                success: function(result){
                    utilities.products = result.products;
                    success(utilities.products);
                },
                error: function() {
                    error()
                }
            });
        }
        else{
            success(utilities.products);
        }
    }
};

export default utilities;