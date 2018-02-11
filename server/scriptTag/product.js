/**
 * Created by ilazaar on 22/01/2018.
 */

import scarcity from './features/scarcity'
import utilities from './utilities'
import  review from './features/st-review'

const productPage = {
    settings : {},
    productSettings : {},
    init: function (settings) {

        utilities.loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.min.js",review.init);
        this.settings = settings;
        $.ajax({
            type: "get",
            url: window.location.pathname+"?view=powerify.settings",
            success: function(result){
                result = JSON.parse(result);
                productPage.productSettings = result.settings;
                scarcity.init(productPage.settings.scarcity, productPage.productSettings, result.productId);
                review.initReviews(result.reviews);
            },
            error: function(e) {
                console.log("error Gettings Settings",e);
            }
        });
    }
};

export default productPage;