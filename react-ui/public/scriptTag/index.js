(function(){
	var APP_URL = "https://de48456c.ngrok.io";
	var shopify = {
		inAdmin:false,
		init : function(){
			this.inAdmin = $("#admin_bar_iframe").length > 0;
			this.addCss();
			this.initBarTop();
		},

		addCss: function(){
			$('head').append('<link rel="stylesheet" href="'+APP_URL+'/scriptTag/style.css" type="text/css" />');
		},

		initBarTop : function(){
			var upperBar =$(".powerify_upper_bar");
			if(upperBar.length > 0){

				//$('html').css('padding-top',inAdmin === "" ? '40px' : '80px');
				upperBar.animate({height: '40px'},300);
				if(this.inAdmin){
					$('body').addClass("inAdmin");
				}
				$('html').animate({paddingTop: this.inAdmin ? '80px' : '40px'},500);
			}
		}
	};
	shopify.init();
}());
