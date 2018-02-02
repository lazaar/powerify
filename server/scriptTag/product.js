/**
 * Created by ilazaar on 22/01/2018.
 */

import scarcity from './features/scarcity'
const productPage = {
    settings : {},
    productSettings : {},
    init: function (settings) {
       this.settings = settings;
        $.ajax({
            type: "get",
            url: window.location.pathname+"?view=powerify.settings",
            success: function(result){
                result = JSON.parse(result);
                productPage.productSettings = result.settings;
                scarcity.init(productPage.settings.scarcity, productPage.productSettings, result.productId);
            },
            error: function(e) {
                console.log("error Gettings Settings",e);
            }
        });
    }
};

export default productPage;