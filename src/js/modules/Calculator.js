import {
    Time
} from './Time.js';

export class Calculator {
    constructor() {
        //local time
        this.clock = document.querySelector('.clock h2');
        this.time = new Time(this.clock);
        this.time.getTime()
    }
}