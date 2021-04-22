import {NormalProducts} from './Products/NormalProducts';
import {BooksAndBrochures} from './Products/BooksAndBrochures';

export class Calculator {
    constructor() {
        this.normalProducts = new NormalProducts()
        this.booksAndBrochures = new BooksAndBrochures()
    }
}