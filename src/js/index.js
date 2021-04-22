import {Slider} from './modules/Slider.js';
import {Info} from './modules/Info.js';
import {Notes} from './modules/Notes.js';
import {Suppliers} from './modules/Suppliers.js';
import {Calculator} from './modules/Calculator.js';
import '../scss/style.scss';

window.addEventListener("DOMContentLoaded", function() {
    const slider = new Slider();
    const info = new Info();
    const suppliers = new Suppliers();
    const notes = new Notes();
    const calculator = new Calculator()
});