
export const upperBar = "<div class=\"powerify_upper_bar\"><a {{link}} style=\"color:{{color}};font-family:{{font}}; background-color:{{backgroundColor}};\">{{text}}</a> </div>";

export const buyme = "<div class='powerify-sticky-me powerify-sticky-me-{{position}}'> " +
        "<button class=\"powerify-sticky-me-button\" style=\"height: {{Size}}; font-family: {{font}}; background-color: {{bg_colorText}}; color: {{colorText}}\" > {{callToAction}}</button> " +
    "</div>";

export const exitCoupons = '<div style="display:none"><div id="powerify-coupon-on-exit" style="color: {{firstColor}}; background-color: {{backgroundColor}}; font-family: {{font}};">'
                                +'<div class="powerify-coupon-wrapper">'
                                    +'<div class="powerify-coupon-innerbox">'
                                        +'<h3 class="powerify-coupon-title">{{firstline}}</h3>'
                                        +'<h4 class="powerify-coupon-subtitle " style="color: {{secondColor}};">{{secondline}}</h4>'
                                        +'<div class="powerify-coupon-code" style="color: {{couponColor}};">{{couponcode}}</div>'
                                    +'</div>'
                                +'</div>'
                            +'</div></div>';

export const upsell ='<div style="display:none"><div id="powerify-upsell">' +
    '<div class="powerify-upsell-title" style="color: {{titleColor}}; font-size: {{titleFontSize}}px; font-family: {{titleFont}};">{{title}}</div>' +
    '<div class="powerify-upsell-subtitle">{{subtitle}}</div>' +
    '<div class="powerify-upsell-products"></div>' +
    '<a class="powerify-upsell-checkout" href="/cart" style=\"color:{{btnColor}};font-family:{{btnFont}}; background-color:{{btnBackgroundColor}};\">{{btnText}}</a>' +
    '</div></div>';