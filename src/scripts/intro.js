//Libs
import $ from 'jquery';
import fullpage from 'fullpage.js';
import Lessons from './lessons.js';

export default class Intro {

    constructor() {
        console.log('Intro');

        //IE compatibility
        if (typeof Object.assign == 'undefined') {
            assign.polyfill();
        }

        this.initEls();
        this.initEvents();

        setTimeout(() => {
            this.initAnimationStep1();
        }, 1000);
    }

    initEls() {

        this.$els = {
            $body: $('body'),
            $fullpage: $('#fullpage'),
            $introText: $('.intro_title'),
            $introTextChoose: $('.intro_title p:nth-child(3)'),
            $heads: $('.head'),
            $hillaryHead: $('.head-hillary'),
            $trumpHead: $('.head-trump'),
            $redBg: $('.red-bg'),
            $blueBg: $('.blue-bg'),

            $quizTitle: $('.title', '.lesson')
        };

        this.hillaryQuote = this.$els.$hillaryHead.find('.quote');
        this.trumpQuote = this.$els.$trumpHead.find('.quote');
        this.lessons = new Lessons();
    }

    initEvents() {

        //Fullpage init
        this.$els.$fullpage.fullpage({
            scrollingSpeed: 700,
            controlArrows: false,
            keyboardScrolling: false
        });

        //Unable fullpage scrolling
        this.$els.$fullpage.fullpage.setAllowScrolling(false);

        //Darken background when hover heads
        this.$els.$hillaryHead.on("mouseenter mouseleave", this.darkenBackgroundRed.bind(this));
        this.$els.$trumpHead.on("mouseenter mouseleave", this.darkenBackgroundBlue.bind(this));

        //Start test when clicking heads
        this.$els.$hillaryHead.on("click", this.startHillary.bind(this));
        this.$els.$trumpHead.on("click", this.startTrump.bind(this));


    }

    initAnimationStep1() {

        //Avoid display problems when fullpage is not loaded
        this.$els.$body.removeClass('hidden');

        setTimeout(() => {
            this.initAnimationStep2();
        }, 500);

    }

    initAnimationStep2() {

        this.$els.$introText.addClass('appear').delay(1200).queue(() => {
            this.$els.$hillaryHead.addClass('appear').delay(300).queue(() => {
                this.$els.$trumpHead.addClass('appear').delay(300).queue(() => {
                    this.$els.$introTextChoose.addClass('appear').dequeue();
                });
            });
        });
    }

    darkenBackgroundBlue() {
        this.$els.$blueBg.toggleClass('darker');
    }

    darkenBackgroundRed() {
        this.$els.$redBg.toggleClass('darker');
    }

    //animations before quiz
    startHillary() {

        this.lessons.currentPerson = "hillary";

        this.hillaryQuote.addClass('disappear').delay(200).queue(() => {
            this.$els.$trumpHead.removeClass('appear').delay(300).dequeue().queue(() => {
                this.$els.$blueBg.addClass('opened').delay(300).queue(() => {
                    this.$els.$introText.addClass('hide');
                    this.$els.$body.addClass('blue');
                    this.$els.$hillaryHead.addClass('big');
                    this.$els.$blueBg.addClass('hide');
                    // this.$els.$fullpage.fullpage.silentMoveTo(2);
                    this.$els.$fullpage.fullpage.moveTo(2);
                    this.$els.$redBg.addClass('hide');
                    this.$els.$quizTitle.addClass('appear');
                });
            });
        });
    }

    startTrump() {

        this.lessons.currentPerson = "trump";

        this.trumpQuote.addClass('disappear').delay(200).queue(() => {
            this.$els.$hillaryHead.removeClass('appear').delay(300).dequeue().queue(() => {
                this.$els.$redBg.addClass('opened').delay(300).queue(() => {
                    this.$els.$introText.addClass('hide');
                    this.$els.$body.removeClass('blue');
                    this.$els.$trumpHead.addClass('big');
                    this.$els.$redBg.addClass('hide');
                    this.$els.$fullpage.fullpage.silentMoveTo(this.lessons.hillaryFinal + 1);
                    this.$els.$fullpage.fullpage.moveTo(this.lessons.hillaryFinal + 2);
                    this.$els.$blueBg.addClass('hide');
                    this.$els.$quizTitle.addClass('appear');
                });
            });
        });
    }


}


