/**
 * Created by ilazaar on 22/01/2018.
 */

import scarcity from './features/scarcity';
import utilities from './utilities';
import  review from './features/st-review';
import upsell from './features/upsell';
import _ from 'lodash';

const productPage = {
    settings : {},
    productSettings : {},
    init: function (settings) {
        const isReviewImage = _.get(settings,'imagereviews.enable',false);
        utilities.loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.51/jquery.form.min.js");
        if(isReviewImage){
            review.init(_.get(settings,'imagereviews',{}));
        }
        this.settings = settings;
        $.ajax({
            type: "get",
            url: window.location.pathname+"?view=powerify.settings",
            success: function(result){
                result = JSON.parse(result);
                productPage.productSettings = result.settings;
                scarcity.init(productPage.settings.scarcity, productPage.productSettings, result.productId);
                if(isReviewImage){
                    review.initReviews(result.reviews);
                }
                upsell.init(productPage.settings.upsell, productPage.productSettings.upsell);

            },
            error: function(e) {
                console.log("error Gettings Settings",e);
            }
        });
    }
};

export default productPage;