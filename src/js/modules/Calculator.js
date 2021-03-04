import {
    Time
} from './Time.js';
import {
    Slider
} from './Slider.js';

export class Calculator {
    constructor() {
        this.clock = document.querySelector('.clock h2');
        this.selectPrintBtn = [...document.querySelectorAll('.select-print-item')]
        this.productContainer = [...document.querySelectorAll('.product')]

        this.slider = new Slider(this.selectPrintBtn, this.productContainer)
        this.time = new Time(this.clock);

        this.time.getTime()
    }
}