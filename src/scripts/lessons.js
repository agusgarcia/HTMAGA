//Libs
import $ from 'jquery';
import fullpage from 'fullpage.js';

export default class Lessons {

    constructor() {
        console.log('Project Concept');

        //console.log('assign', typeof Object.assign, assign);
        if (typeof Object.assign == 'undefined') {
            //console.log('polyfill launch');
            assign.polyfill();
        }

        this.initEls();
        this.initEvents();
        //this.initAnimations();

        setTimeout(() => {
            this.initAnimationStep1();
        }, 500);
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
            $blueBg: $('.blue-bg')
        }

        this.hillaryQuote = this.$els.$hillaryHead.find('.quote');

    }

    initEvents() {

        this.$els.$fullpage.fullpage({
            scrollingSpeed: 700,
            scrollBar: false,

            onLeave: function (index, nextIndex, direction) {
                if (index == 1) {
                    //   this.leaveIntro();
                }

                if (nextIndex == 1) {
                    // this.goToIntro();
                }
            }.bind(this)

        });

        this.$els.$hillaryHead.on("mouseenter", this.darkenBackgroundRed.bind(this));
        this.$els.$hillaryHead.on("mouseleave", this.darkenBackgroundRed.bind(this));
        this.$els.$trumpHead.on("mouseenter", this.darkenBackgroundBlue.bind(this));
        this.$els.$trumpHead.on("mouseleave", this.darkenBackgroundBlue.bind(this));

        this.$els.$hillaryHead.on("click", this.startHillary.bind(this));
    }

    initAnimationStep1() {
        this.$els.$introText.addClass('appear').delay(1200).queue(() => {
            this.$els.$hillaryHead.addClass('appear').delay(300).queue(() => {
                this.$els.$trumpHead.addClass('appear').delay(300).queue(() => {
                    this.$els.$introTextChoose.addClass('appear').dequeue();
                });
            });
        });
    }

    startLessons() {
        console.log("hello");
    }

    darkenBackgroundBlue() {
        this.$els.$blueBg.toggleClass('darker');
    }

    darkenBackgroundRed() {
        this.$els.$redBg.toggleClass('darker');
    }

    startHillary() {
        this.hillaryQuote.addClass('disappear').delay(200).queue(() => {
            this.$els.$trumpHead.removeClass('appear').delay(400).dequeue().queue(() => {
                this.$els.$blueBg.addClass('opened').delay(600).dequeue().queue(() => {
                    this.$els.$body.addClass('blue').dequeue();
                    this.$els.$fullpage.fullpage.silentMoveTo(2);
                    this.$els.$fullpage.fullpage.moveTo(3);
                });
            });
        });
    }
}


