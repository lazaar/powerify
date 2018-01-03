(function(){
	var APP_URL = "https://a1cee8ca.ngrok.io";
	var shopify = {
		init : function(){
			this.addCss();
			this.addBarTop();
		},

		addCss: function(){
			$('head').append('<link rel="stylesheet" href="'+APP_URL+'/scriptTag/style.css" type="text/css" />');
		},

		addBarTop : function(){
			var inAdmin = $("#admin_bar_iframe").length > 0 ? "inAdmin" : "";
			$('body').append('<div id="fsb_bar" class="' + inAdmin +'">Christmas Sale! Free shipping to Morocco</div>');
			$('html').css('padding-top',inAdmin === "" ? '40px' : '80px');
		}
	}
	shopify.init();
}());
