/**
 * Created by ilazaar on 22/01/2018.
 */
import {
    APP_URL
} from '../../config';
import * as htmlTemplate from '../htmlTemplate';
import push from 'push.js';

const review = {
    init: function (settings) {
        $('.powerify-add-review-btn').css({
            "background-color":settings.bgColorText,
            "color":settings.submitColorText
        }).slideDown().on('click', function () {
            $('.powerify-form-review').slideDown();
            $(this).hide();
        });
        review.reviewForm(settings);
    },
    reviewForm:function (settings) {
        $('.powerify-form-review-submit').css({
            "background-color":settings.bgColorText,
            "color":settings.submitColorText
        });
        $('.powerify-review-star-form').on('click', function () {
            var newValue = $(this).index() +1 ;
            var starsInput = $(".powerify-input-stars");
            $(this).parent().removeClass("powerify-review-rate-"+starsInput.val()+"-form").addClass("powerify-review-rate-"+newValue+"-form");
            starsInput.val(newValue);
        });

        $('.powerify-form-review').attr("action",APP_URL+"/v1/api/reviewServer")
            .on('submit', function (e) {
            e.preventDefault();
            var self = $(this);
            var errorElemment = self.find(".powerify-submit-message");

            $(this).addClass("isSubmitting");
            errorElemment.html("").removeClass("error");
            $(this).ajaxSubmit({
                success: function () {
                    errorElemment.html(settings.successMessage);
                    self.removeClass("isSubmitting");
                    self.resetForm();
                },
                error: function () {
                    errorElemment.html(settings.errorMessage).addClass("error");
                    self.removeClass("isSubmitting");
                }
            });
        });
    },
    initReviews:function (reviews) {
        let html = "";
        var stars = {
            globalUsers:reviews.length,
            globalRate:0,
            fiveStar:0,
            fourStar:0,
            threeStar:0,
            twoStar:0,
            oneStar:0
        };

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

            stars.globalRate += item.stars;

            switch(item.stars) {
                case 5:
                    stars.fiveStar++;
                    break;
                case 4:
                    stars.fourStar++;
                    break;
                case 3:
                    stars.threeStar++;
                    break;
                case 2:
                    stars.twoStar++;
                    break;
                case 1:
                    stars.oneStar++;
                    break;
            }

            html += htmlItem;
        });

        stars.globalRate /= stars.globalUsers;
        stars.globalRate = Math.round(stars.globalRate*2)/2;
        const reviewElement = $(".powerify-reviews");
        if(html !== ""){
            reviewElement.slideDown();
            reviewElement.find(".powerify-reviews-items").html(html);
            reviewElement.find(".powerify-reviews-resume").html(review.initResume(stars));
        }
    },
    initResume:function (stars) {
        var html = htmlTemplate.reviewResume;
        var globalStars = "";
        for(let i=0; i< Math.floor(stars.globalRate); i++){
            globalStars += '<i class="icon-star"></i>';
        }
        if(!Number.isInteger(stars.globalRate)){
            globalStars += '<i class="icon-star-half"></i>';
        }
        html = html.replace("{{globalRate}}", stars.globalRate)
            .replace("{{globalUsers}}", stars.globalUsers +" Reviews")
            .replace("{{globalStars}}", globalStars)
            .replace("{{fiveStar}}", "<span>" + stars.fiveStar + " Review" + (stars.fiveStar > 1 ? "s" : "") + "</span>")
            .replace("{{fourStar}}", "<span>" + stars.fourStar + " Review" + (stars.fourStar > 1 ? "s" : "") + "</span>")
            .replace("{{threeStar}}", "<span>" + stars.threeStar + " Review" + (stars.threeStar > 1 ? "s" : "") + "</span>")
            .replace("{{twoStar}}", "<span>" + stars.twoStar + " Review" + (stars.twoStar > 1 ? "s" : "") + "</span>")
            .replace("{{oneStar}}", "<span>" + stars.oneStar + " Review" + (stars.oneStar > 1 ? "s" : "") + "</span>");
        return html;
    }
};

export default review;
