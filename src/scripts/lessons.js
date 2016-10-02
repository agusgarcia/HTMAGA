//Libs
import $ from 'jquery';
import fullpage from 'fullpage.js';

export default class Lessons {

    constructor() {
        console.log('Lessons');

        if (typeof Object.assign == 'undefined') {
            //console.log('polyfill launch');
            assign.polyfill();
        }

        this.initEls();
        this.initEvents();

    }

    initEls() {

        this.$els = {
            $body: $('body'),
            $fullpage: $('#fullpage'),
            $hillaryHead: $('.head-hillary'),
            $trumpHead: $('.head-trump'),
            $facepalmHillary: $('.head-facepalm-hillary'),
            $facepalmTrump: $('.head-facepalm-trump'),
            $understoodButton: $('.btn-understood'),
            $nextButton: $('.btn-next'),
            $gifs: $('.gif-quiz'),
            $gifContainer: $('.gif-container'),
        };

        this.currentPerson = "";
        this.lessonNumber = 0;
        this.hillaryLessons = 5;
        this.hillaryFinal = this.hillaryLessons + 2;

        //Arrays of gifs and phrases
        this.hillaryRightGif = [];
        this.hillaryWrongGif = [];
        this.trumpRightGif = [];
        this.trumpWrongGif = [];
        this.hillaryRightPhrase = ["Yes! Right answer", "I knew you would be right", "That's the attitude", "Your're doing right", "We make a great team"];
        this.hillaryWrongPhrase = ["You're wrong darling", "Bad answer...", "You have to do better next time", "That's not what I teached you"];
        this.trumpRightPhrase = ["Finally you're not that stupid", "Right answer son 😎", "Well done!", "You won't be fired"];
        this.trumpWrongPhrase = ["YOU'RE FIRED 😠", "You're a looser", "Are you serious?", "You disappoint me"];
        this.gifResult = "";
    }

    initEvents() {

        this.$els.$understoodButton.on('click', this.goToTest.bind(this));
        this.$els.$nextButton.on('click', this.goToNext.bind(this));

        this.$els.$gifs.on('click', this.verifyAnswer.bind(this));

        //Populate arrays of gifs
        for (let i = 1; i < 8; i++) {
            this.hillaryRightGif.push("./web/images/gifs/hillary_right_" + i + ".gif");
        }

        for (let i = 1; i < 3; i++) {
            this.hillaryWrongGif.push("./web/images/gifs/hillary_wrong_" + i + ".gif");
        }

        for (let i = 1; i < 5; i++) {
            this.trumpRightGif.push("./web/images/gifs/trump_right_" + i + ".gif");
        }

        for (let i = 1; i < 5; i++) {
            this.trumpWrongGif.push("./web/images/gifs/trump_wrong_" + i + ".gif");
        }

    }



    goToTest() {
        this.lessonNumber++;
        if (this.currentPerson == 'hillary') {
            this.$els.$hillaryHead.addClass('spying');
        } else if (this.currentPerson == 'trump') {
            this.$els.$trumpHead.addClass('spying');
        }
        this.$els.$fullpage.fullpage.moveSlideRight();
    }

    goToNext() {

        if (this.currentPerson == 'hillary') {
            this.$els.$facepalmHillary.removeClass('appear');
        } else if (this.currentPerson == 'trump') {
            this.$els.$facepalmTrump.removeClass('appear');
        }

        this.$els.$fullpage.fullpage.moveSectionDown();

    }

    verifyAnswer(e) {

        if (this.currentPerson == "hillary") {
            this.$els.$hillaryHead.removeClass('spying');
        } else if (this.currentPerson == "trump") {
            this.$els.$trumpHead.removeClass('spying');
        }

        this.currentLessonSelector = $('.lesson-' + this.lessonNumber + '.lesson-' + this.currentPerson);

        this.gifResult = this.currentLessonSelector.siblings().find('.gif-result');
        this.phraseResult = this.currentLessonSelector.siblings('.result').find('.title');

        console.log(this.phraseResult);
        this.answer = e.target.classList.contains('gif-' + this.currentPerson);

        this.gifResult.attr('src', this.getGif.bind(this));
        this.phraseResult.html(this.getPhrase.bind(this));

        this.$els.$fullpage.fullpage.moveSlideRight();

    }

    //Generate a random gif and phrase according to character and the answer
    getGif() {
        let array;

        switch (this.currentPerson) {
            case "hillary":
                if (this.answer == true) {
                    array = this.hillaryRightGif;
                } else if (this.answer == false) {
                    array = this.hillaryWrongGif;
                    this.$els.$facepalmHillary.addClass('appear');
                }
                break;

            case "trump":
                if (this.answer == true) {
                    array = this.trumpRightGif;
                } else if (this.answer == false) {
                    array = this.trumpWrongGif;
                    this.$els.$facepalmTrump.addClass('appear');
                }
                break;
        }

        let randomNumber = Math.floor((Math.random() * array.length - 1) + 1);

        return array[randomNumber]

    }

    getPhrase() {
        let array;

        switch (this.currentPerson) {
            case "hillary":
                if (this.answer == true) {
                    array = this.hillaryRightPhrase;
                } else if (this.answer == false) {
                    array = this.hillaryWrongPhrase;
                }
                break;

            case "trump":
                if (this.answer == true) {
                    array = this.trumpRightPhrase;
                } else if (this.answer == false) {
                    array = this.trumpWrongPhrase;
                }
                break;
        }

        let randomNumber = Math.floor((Math.random() * array.length - 1) + 1);

        console.log(array[randomNumber]);
        return array[randomNumber]
    }

}


