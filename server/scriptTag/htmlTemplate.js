
export const quickViewModal = '<div style="display:none; height: 500px;">' +
    '<div id="{{productID}}-modal" class="powerify-qv-modal powerify-inLoad">' +
        '<div class="powerify-loader"></div>' +
        '<div class="powerify-content-modal">' +
            '<div class="powerify-qv-content-image">' +
                '<img src="{{image}}"/> ' +
            '</div>' +
            '<div class="powerify-qv-content-product">' +
                '<div class="powerify-qv-product-title"> {{title}} </div>' +
                '<div class="powerify-qv-product-price">{{price}}</div>' +
                '<div class="powerify-qv-product-description"> {{description}} </div>' +
                '<div class="powerify-qv-seeMore"> <a href="{{link}}"> {{viewDetailPageText}} → </a> </div>' +
                '<form action="/cart/add" method="post" enctype="multipart/form-data" class="powerify-qv-buy-panel powerify-insidePopup">' +
                    '{{variations}}' +
                    '<input type="number" min="1" value="1" name="quantity">' +
                    '<input type="submit" value="{{addToCartText}}" />' +
                '</form>' +
            '</div>' +
        '</div>' +
    '</div></div>';


export const reviewItem = '<div class="powerify-review-item {{classes}}">' +
        '<div class="powerify-review-name">{{name}}</div>' +
        '<div class="powerify-review-image">{{image}}</div>' +
        '<div class="powerify-review-body">' +
            '<div class="powerify-review-title">{{title}}</div>' +
            '<div class="powerify-review-stars powerify-rate-{{stars}}">' +
                '<i class="powerify-star"></i>' +
                '<i class="powerify-star powerify-star-2"></i>' +
                '<i class="powerify-star powerify-star-3"></i>' +
                '<i class="powerify-star powerify-star-4"></i>' +
                '<i class="powerify-star powerify-star-5"></i></div>'+
            '<p class="powerify-review-content">{{content}}</p>' +
        '</div>' +
        '<div class="powerify-review-date">{{date}}</div>' +
    '</div>';
export const reviewResume = '<div class="powerify-review-resume-1">' +
            '<div class="powerify-review-resume-golbalRate">{{globalRate}}</div>' +
            '<div class="powerify-review-resume-golbalStars">{{globalStars}}</div>' +
            '<div class="powerify-review-resume-golbalUsers">{{globalUsers}}</div>' +
    '</div>'+
    '<div class="powerify-review-resume-2">' +
        '<div class="powerify-review-resume-stars-wrapper">' +
            '<div class="powerify-review-resume-stars"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i> {{fiveStar}}</div>' +
            '<div class="powerify-review-resume-stars"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star empty-star"></i> {{fourStar}}</div>' +
            '<div class="powerify-review-resume-stars"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star empty-star"></i><i class="icon-star empty-star"></i> {{threeStar}}</div>' +
            '<div class="powerify-review-resume-stars"><i class="icon-star"></i><i class="icon-star"></i><i class="icon-star empty-star"></i><i class="icon-star empty-star"></i><i class="icon-star empty-star"></i> {{twoStar}}</div>' +
            '<div class="powerify-review-resume-stars"><i class="icon-star"></i><i class="icon-star empty-star"></i><i class="icon-star empty-star"></i><i class="icon-star empty-star"></i><i class="icon-star empty-star"></i> {{oneStar}}</div>' +
        '</div>' +
    '</div>';
export const upSellItem= '<div class="powerify-upsell-product"><a class="powerify-upsell-product-link" href="/products/{{href}}">' +
    '<img src="{{imageSrc}}" class="powerify-upsell-product-image"/>' +
    '<div class="powerify-upsell-product-title">{{title}}</div></a>' +
    '<form action="/cart/add" method="post" enctype="multipart/form-data" class="powerify-insidePopup">' +
        '<div class="powerify-upsell-product-variations">{{variations}}</div>' +
        '<div class="powerify-upsell-product-price" style="color:{{priceColor}}; font-size:\'{{priceFontSize}}px\'">{{price}}</div>' +
        '<div class="powerify-result-message"></div>' +
        '<button type="submit" class="powerify-upsell-product-addToCart" style="background-color:{{btnBgColor}};color:{{btnColor}}">{{addToCartText}}</button>' +
    '</form>' +
    '</div>';