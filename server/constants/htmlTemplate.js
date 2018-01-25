
export const upperBar = "<div class=\"powerify_upper_bar\" style=\"height:40px; color:{{color}};font-family:{{font}}; background-color:{{backgroundColor}};\">{{text}}</div>";
export const buyme = "<div id='buybuy' class='buybuy powerify_add_to_card transition' style=\" {{position}}: 0; height : {{Size}}; \" >  <button type=\"submit\" name=\"add\" onclick=\"myFunction()\"  class=\"sticky-button\" >  <span > {{callToAction}} </span></button>  </div>   <script>function myFunction() {document.getElementById(\"AddToCart-product-template\").click();} </script>";

export const exitCoupons = '<div style="display:none"><div id="powerify-coupon-on-exit" style="color: {{firstColor}}; background-color: {{backgroundColor}}; font-family: {{font}};">'
                                +'<div class="powerify-coupon-wrapper">'
                                    +'<div class="powerify-coupon-innerbox">'
                                        +'<h3 class="powerify-coupon-title">{{firstline}}</h3>'
                                        +'<h4 class="powerify-coupon-subtitle " style="color: {{secondColor}};">{{secondline}}</h4>'
                                        +'<div class="powerify-coupon-code" style="color: {{couponColor}};">{{couponcode}}</div>'
                                    +'</div>'
                                +'</div>'
                            +'</div></div>';
