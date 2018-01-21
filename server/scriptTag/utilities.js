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

export default utilities;