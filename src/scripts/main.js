'use strict';

//Style
import '../styles/main.scss';


//Pages Classes
import Intro from './intro.js'
import Lessons from './lessons.js'

export default class app {
    constructor() {
        console.log('Constructor app');

        this.initEls();
        this.initEvents();
    }

    initEls() {
        this.$els = {
            $body: $('body'),
            $document: $(document),
        }
    }

    initEvents() {
        this.launchPage();
    }

    launchPage() {
        this.controllerPage = new Intro();
    }

}


new app();