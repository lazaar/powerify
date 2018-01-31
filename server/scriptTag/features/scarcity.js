/**
 * Created by ilazaar on 22/01/2018.
 */
import utilities from '../utilities';
const scarcity = {
    settings:{},
    init: function (settings, productSettings) {
        if(!settings.enable || productSettings.disable){
            return;
        }
        var form = $('form[action="/cart/add"]');
        var element = $('#powerify-scarify');
        if(element.length === 0){
            element = $('<div id="powerify-scarify"></div>').appendTo(form);
        }
        var text = $( "<div class='powerify-scarify-text'></div>" ).insertBefore(element);
        utilities.loadScript("https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.js",function () {
            console.log(settings, productSettings);
            text.html(productSettings.text.replace("{{stock}}",productSettings.numberStock));

            var time = (parseInt(productSettings.days) * 86400) + (parseInt(productSettings.hours) * 3600)+ (parseInt(productSettings.minutes) * 60) + parseInt(productSettings.seconds);
            var clock = new FlipClock($('#powerify-scarify'), {
                clockFace: 'HourlyCounter',
                countdown:true
            });
            clock.setTime(time);
        });

    }
    
};

export default scarcity;
