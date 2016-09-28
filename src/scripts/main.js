'use strict';

//Style
import '../styles/main.scss';


//Pages Classes
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
        this.controllerPage = new Lessons();
    }

}


new app();