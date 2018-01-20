(function(){
	var APP_URL = "https://9cb35aa3.ngrok.io";
	var shopify = {
		inAdmin:false,
		init : function(){
			this.inAdmin = $("#admin_bar_iframe").length > 0;
			this.addCss();
			this.initBarTop();
			this.initBuyMe();
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
		initBuyMe : function(){
			var buyme =$(".powerify_add_to_card");
			if(buyme.length > 0){

				//$('html').css('padding-top',inAdmin === "" ? '40px' : '80px');
				buyme.animate({height: '70px'},300);
			}
		}
		
	};
	shopify.init();
}());
