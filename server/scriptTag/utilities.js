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
    }
};

export default utilities;