
export const quickViewModal = '<div style="display:none; height: 500px;"><div id="{{productID}}-modal" class="powerify-qv-modal powerify-inLoad" style="height: 500px; width: 90%;"><div class="powerify-loader"></div><div class="powerify-content-modal" style> <div style="width : 44%; float: left; padding: 20px 0px 10px;"> <img src="{{image}}"/> </div> <div style="width: 52%;  float: right; padding : 20px 0px 10px;">  <div id="product-title" style="font-size : 20px; margin-bottom : 12px; font-weight: bold; color: {{ProductNameColorText}};"> {{title}} </div> <div id = "product-price" style="font-size : 23px; margin-bottom : 12px; color: {{PriceColorText}};"> 15$  <del> 19.99$ </del> </div> <div id= "prod-description" style="margin-bottom : 10px; overflow: auto; height: 100px;"> {{description}} </div> <div id="seeMore" style="color : #f45b4f;"> <a href="www.google.com">  View full product details → </a> </div> <div id="buy-panel" style="display: inline-block;"> <label> Quantity </label> <input type="number" min="1" value="1"> <input type="submit" style="background-color : {{AToCBtnColorText}}; color : #fff; font-weight : 700" value="ADD TO CART"> </div> </div> </div></div></div>';
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
