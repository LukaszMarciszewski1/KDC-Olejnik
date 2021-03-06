import {Time} from './modules/accessories/Time.js';
import {Slider} from './modules/accessories/Slider.js';
import {Notes} from './modules/accessories/Notes.js';
import {Calculator} from './modules/calculation/Calculator.js';
import '../scss/style.scss';

window.addEventListener("DOMContentLoaded", () => {
    const slider = new Slider()
    const time = new Time();
    const notes = new Notes();
    const calculator = new Calculator()
});