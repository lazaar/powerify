/**
 * Created by ilazaar on 22/01/2018.
 */
import utilities from '../utilities';
import {
    APP_URL
} from '../../config/index';

const scarcity = {
    timeStart:0,
    productId:0,
    init: function (settings, productSettings, productId) {
        this.productId = productId;
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
            if(productSettings.decrementStock && text.find('.number-stock').length > 0){
                scarcity.initStockNumber(text.find('.number-stock'), productSettings.keepStock, scarcity.getRandomTime());
            }

            var time = (parseInt(productSettings.days) * 86400) + (parseInt(productSettings.hours) * 3600)+ (parseInt(productSettings.minutes) * 60) + parseInt(productSettings.seconds);
            time -= Math.floor(scarcity.getTimer()/1000);
            if(time <= 0){
                scarcity.clearTimer();
                return;
            }
            $(window).on('unload',scarcity.saveTimer);
            var clock = new FlipClock(element, {
                clockFace: 'HourlyCounter',
                countdown:true,
                callbacks:{
                    start:function () {
                        scarcity.timeStart = Date.now();
                    }
                }
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
        clock.start(true);
    },
    initStockNumber:function (element, keepStock, time) {
        setTimeout(function () {
            var currentNbr = parseInt(element.html());
            element.html(--currentNbr);
            if(currentNbr > parseInt(keepStock)){
                scarcity.initStockNumber(element,keepStock,scarcity.getRandomTime());
            }
        }, time);
    },
    saveTimer:function () {
        var timers = JSON.parse(localStorage.getItem("powerify-scarcity")) || {};
        var timePassed = Date.now() - scarcity.timeStart;
        timers[scarcity.productId] = timers[scarcity.productId] ? parseInt(timers[scarcity.productId]) + timePassed : timePassed;
        localStorage.setItem("powerify-scarcity", JSON.stringify(timers));
    },
    clearTimer:function () {
        var timers = JSON.parse(localStorage.getItem("powerify-scarcity")) || {};
        timers[scarcity.productId] = 0;
        localStorage.setItem("powerify-scarcity", JSON.stringify(timers));
    },
    getTimer:function () {
        var timers = JSON.parse(localStorage.getItem("powerify-scarcity")) || {};
        return timers[scarcity.productId] ? parseInt(timers[scarcity.productId]) : 0;
    },
    getRandomTime : function() {
        return Math.floor(Math.random() * 5001) + 4000;
    }
    
};

export default scarcity;
