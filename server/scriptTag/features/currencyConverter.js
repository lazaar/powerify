/**
 * Created by ilazaar on 22/01/2018.
 */
import countries from '../../config/countries.json';
import _ from 'lodash';

const currencyConverter = {
    currency:'',
    moneyFormat:'',
    newMoneyFormat:'',
    settings:{},
    convertionRates:{},
    currencyText:'',
    data:{
        visitorCountry:'',
        visitorCountryCode:'',
        visitorCurrency:'',
        visitorCurrencySymbol:''
    },

    init: function (currency, moneyFormat, settings, success) {
        var data = JSON.parse(localStorage.getItem("powerify-currencyConverter")) || {};
        this.currency = currency;
        this.moneyFormat = moneyFormat;
        this.newMoneyFormat = moneyFormat;
        this.settings = settings;
        if(data.visitorCountry){
            success(data);
            currencyConverter.data = data;
            currencyConverter.getRate();
        }
        else{
          $.get("https://ipinfo.io", function(response) {
            currencyConverter.data.visitorCountryCode = response.country;
            var countryData = currencyConverter.searchForCountry(currencyConverter.data.visitorCountryCode);

            currencyConverter.data.visitorCountry = countryData.name;
            currencyConverter.data.visitorCurrency = countryData.currency ?  countryData.currency.currencyCode : "" ;
            currencyConverter.data.visitorCurrencySymbol = countryData.currency ?  countryData.currency.currencySymbol : "" ;
            localStorage.setItem("powerify-currencyConverter", JSON.stringify(currencyConverter.data));
            success(currencyConverter.data);
            currencyConverter.getRate();
          }, "jsonp");
        }
    },

    getRate : function(){
        this.data.visitorCurrency="USD";//TODO : Remove this line
        this.currencyText = this.settings.displayWith === 'symbol' ? this.data.visitorCurrencySymbol : this.data.visitorCurrency;
        if(this.data.visitorCurrency !== this.currency ) {
            var oldConvertionRates = JSON.parse(localStorage.getItem("powerify-convertionRates")) || {};

            var today = new Date();
            today.setHours(0, 0, 0, 0);
            if(oldConvertionRates.date === today.toDateString()){
                currencyConverter.convertionRates = oldConvertionRates;
                if (currencyConverter.convertionRates[currencyConverter.data.visitorCurrency] && currencyConverter.convertionRates[currencyConverter.currency] && currencyConverter.settings.isEnable) {
                    currencyConverter.convertPrice();
                }
            }
            else{
                $.ajax(
                    {
                        url: 'https://api.fixer.io/latest?base=USD',
                        success: function(result){
                            var today = new Date();
                            today.setHours(0, 0, 0, 0);
                            result.date = today.toDateString();
                            localStorage.setItem("powerify-convertionRates", JSON.stringify(result));
                            currencyConverter.convertionRates = result.rates;
                            currencyConverter.convertionRates['USD'] = 1.0 ;
                            currencyConverter.convertionRates['MAD'] = 1.2 ; //TODO : Remove this line
                            if (currencyConverter.convertionRates[currencyConverter.data.visitorCurrency] && currencyConverter.convertionRates[currencyConverter.currency] && currencyConverter.settings.isEnable) {
                                currencyConverter.convertPrice();
                            }
                        }
                    }
                );
            }
        }
    },

    convertPrice : function(){
        this.newMoneyFormat = "{{amount}} " + currencyConverter.currencyText;
        $('[id*="Price"],[id*="price"],[class*="Price"],[class*="price"]').each(function () {
            var html = $(this).html().trim();
            var currencySymbol = currencyConverter.moneyFormat.trim().split(" ")[1];
            if(html.length < 20 && html.endsWith(currencySymbol)){
                var price = html.replace(currencySymbol,"");
                $(this).html(currencyConverter.getNewPrice(price));

            }
        });


    },

    getNewPrice:function (price) {
        var initialPrice = parseFloat(price);
        if(currencyConverter.settings.isEnable && this.convertionRates && this.convertionRates.length > 0){
            var convertedPrice = (this.convertionRates[this.data.visitorCurrency]*initialPrice / this.convertionRates[this.currency]).toFixed(2);
          if ( this.settings.decimals === 1 ){
                convertedPrice = Math.trunc(convertedPrice);
            }
            else if( this.settings.decimals === 2){
                convertedPrice = Math.floor(convertedPrice);
            }
            else if ( this.settings.decimals === 3 ){
                convertedPrice = Math.trunc(convertedPrice) + 0.99 ;
            }
            return convertedPrice +' '+ currencyConverter.currencyText;
        }
        return Shopify.formatMoney(price, currencyConverter.moneyFormat);
    },
    
    getCountry: function(){
        return this.data.visitorCountry;
    },
  
    searchForCountry:function(codeCountry) {
      var results = [];

      if (countries) {
        results = _.find(countries, function(o) { return o.code == codeCountry; });
      }

      return (!_.isEmpty(results)) ? (results) : [] ;
    }

};

export default currencyConverter;
