import { NormalProducts } from './calculation/NormalProducts'
import { BooksAndBrochures } from './calculation/BooksAndBrochures'

export class Calculator {
  constructor() {
    this.normalProducts = new NormalProducts()
    this.booksAndBrochures = new BooksAndBrochures()
  }
}
