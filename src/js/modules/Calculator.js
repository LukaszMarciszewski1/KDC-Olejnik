import {Time} from './accessories/Time.js';
import {Slider} from './accessories/Slider.js';
import {Products} from './calculation/Products.js';

export class Calculator {
    constructor() {
        //clock and slider
        this.clock = document.querySelector('.clock h2');
        this.selectPrintBtn = [...document.querySelectorAll('.select-print-item')]
        this.productContainer = [...document.querySelectorAll('.product')]

        this.slider = new Slider(this.selectPrintBtn, this.productContainer)
        this.time = new Time(this.clock);
        this.products = new Products()
    }

}