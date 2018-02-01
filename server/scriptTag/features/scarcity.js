/**
 * Created by ilazaar on 22/01/2018.
 */
import utilities from '../utilities';
import {
    APP_URL
} from '../../config/index';

const scarcity = {
    settings:{},
    init: function (settings, productSettings) {
        if(!settings.enable || productSettings.disable){
            return;
        }
        var form = $('form[action="/cart/add"]');
        var wrapper = $('#powerify-scarcity-wrapper');
        var element;
        if(wrapper.length === 0){
            wrapper = $('<div id="powerify-scarcity-wrapper"><div id="powerify-scarcity"></div></div>').insertAfter(form);
            element = wrapper.find("#powerify-scarcity");
        }
        else{
            element = $('<div id="powerify-scarcity"></div>').appendTo(wrapper);
        }

        var text = $( "<div class='powerify-scarcity-text'></div>" ).insertBefore(element);
        utilities.loadScript(APP_URL+"/libs/flipclock.js",function () {
            text.html(productSettings.text.replace("{{stock}}",'<span class="number-stock">'+productSettings.numberStock+"</span>"));

            var time = (parseInt(productSettings.days) * 86400) + (parseInt(productSettings.hours) * 3600)+ (parseInt(productSettings.minutes) * 60) + parseInt(productSettings.seconds);
            var clock = new FlipClock(element, {
                clockFace: 'HourlyCounter',
                countdown:true
            });
            clock.setTime(time);
            element.addClass("powerify-scarcity-"+settings.scarcityStyle);
            if(scarcity[settings.scarcityStyle]){
                scarcity[settings.scarcityStyle](clock);
            }
            else{
                scarcity.defaultStart(clock);
            }


        });
        wrapper.css({"text-align":settings.textalign});

        text.css({
            "color":settings.colorText,
            "font-size":settings.fontsize +"px",
            "font-weight":settings.fontweight
        });
        if(settings.font !=="default"){
            text.css({
                "font-family":settings.font
            });
        }

    },
    flipper:function (clock) {
        clock.start();
    },
    red:function (clock) {
        clock.start();
    },
    defaultStart:function (clock) {
        clock.start(null, true);
    }
    
};

export default scarcity;
