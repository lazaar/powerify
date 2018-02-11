/**
 * Created by ilazaar on 22/01/2018.
 */
import {
    APP_URL
} from '../../config';
import * as htmlTemplate from '../htmlTemplate';

const review = {
    init: function () {
        review.reviewForm();
    },
    initBeforeSettings: function () {
        $('.powerify-add-review-btn').slideDown().on('click', function () {
            $('.powerify-form-review').slideDown();
            $(this).hide();
        });
    },
    reviewForm:function () {
        $('.powerify-review-star-form').on('click', function () {
            var newValue = $(this).index() +1 ;
            var starsInput = $(".powerify-input-stars");
            $(this).parent().removeClass("powerify-review-rate-"+starsInput.val()+"-form").addClass("powerify-review-rate-"+newValue+"-form");
            starsInput.val(newValue);
        });

        $('.powerify-form-review').attr("action",APP_URL+"/v1/api/reviewServer");

        $('.powerify-form-review').on('submit', function (e) {
            e.preventDefault();
            var self = $(this);
            var errorElemment = self.find(".powerify-submit-message");

            $(this).addClass("isSubmitting");
            errorElemment.html("").removeClass("error");
            $(this).ajaxSubmit({
                success: function () {
                    errorElemment.html("Review added");
                    self.removeClass("isSubmitting");
                    self.resetForm();
                },
                error: function () {
                    errorElemment.html("Error on saving review").addClass("error");
                    self.removeClass("isSubmitting");
                }
            });
        });
    },
    initReviews:function (reviews) {
        let html = "";
        reviews.forEach((item) => {
            let classes ="";
            let htmlItem = htmlTemplate.reviewItem;
            let date = new Date(item.updatedAt);
            let image ="";
            if(!item.image){
                classes +="no-image";
            }
            else{
                image = '<a data-fancybox="gallery" href="'+APP_URL +"/"+item.image+'"><img src="'+APP_URL +"/"+item.image+'"></a>';
            }
            htmlItem = htmlItem.replace("{{name}}",item.name)
                        .replace("{{title}}",item.title)
                        .replace("{{stars}}",item.stars)
                        .replace("{{classes}}",classes)
                        .replace("{{image}}", image)
                        .replace("{{date}}", date.toLocaleDateString("en-US"))
                        .replace("{{content}}",item.content || "");

            html += htmlItem;
        });
        $(".powerify-reviews").html(html);
    }
};

export default review;
