import {Time} from './modules/accessories/Time.js';
import {Slider} from './modules/accessories/Slider.js';
import {Info} from './modules/accessories/Info.js';
import {Notes} from './modules/accessories/Notes.js';
import {Suppliers} from './modules/accessories/Suppliers.js';
import {Calculator} from './modules/calculation/Calculator.js';
import '../scss/style.scss';

window.addEventListener("DOMContentLoaded", () => {
    const slider = new Slider();
    const info = new Info();
    const suppliers = new Suppliers();
    // const time = new Time();
    const notes = new Notes();
    const calculator = new Calculator()
});