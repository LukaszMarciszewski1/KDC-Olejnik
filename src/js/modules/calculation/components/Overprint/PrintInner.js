import printPrice from '../prices/printPrice.js';

 class PrintInner {
  constructor(pages, black, color, empty) {
    this.pages = document.getElementById(pages)
    this.pagesBlack = document.getElementById(black)
    this.pagesColor = document.getElementById(color)
    this.pagesEmpty = document.getElementById(empty)
  }

  getPriceInnerPrint(countEl, sizeEl, materialEl, sheetsEL) {
    let price = 0
    let count = parseInt(this.pages.value)
    let countColor = parseInt(this.pagesColor.value)
    let countEmpty = parseInt(this.pagesEmpty.value)
    let countBlack = count - countColor - countEmpty
    this.pagesBlack.value = countBlack
    let priceBlack = 0
    let priceColor = 0
    const sizeA4 = 0.06237 //per square meter (0.297 * 0.210)mm
    let numberEl = sizeEl / sizeA4

    if (numberEl > 0.5 && numberEl < 1) numberEl = 0.5
    if (numberEl > 0 && numberEl < 0.5) numberEl = 0.25

    let modifierBlack = countBlack * numberEl
    let modifierColor = countColor * numberEl

    if (countEl > 0) {
      //printing conditions
      this.pagesEmpty.max = count
      this.pagesColor.max = count

      if (numberEl >= 1) {
        priceBlack = printPrice.A4_blackOneSide * countBlack
        priceColor = (printPrice.SRA3_colorOneSided / 2) * countColor
      } else if (numberEl < 1) {
        priceBlack = printPrice.A4_blackOneSide * modifierBlack
        priceColor = (printPrice.SRA3_colorOneSided / 2) * modifierColor
      }

      //quantity conditions
      if (count > 0) {
        this.pagesColor.disabled = false
        this.pagesEmpty.disabled = false
        if (countColor >= count) {
          this.pagesColor.value = count - countEmpty
          countColor = this.pagesColor.value
          this.pagesEmpty.disabled = true
          this.pagesBlack.value = 0
          countBlack = 0

        } else if (countEmpty >= count) {
          this.pagesEmpty.value = count - countColor
          countEmpty = this.pagesEmpty.value
          this.pagesColor.disabled = true
          this.pagesBlack.value = 0
          countBlack = 0
        } else if (countColor > count || countEmpty > count || countColor + countEmpty > count) return;

      } else {
        this.pagesColor.disabled = true
        this.pagesEmpty.disabled = true
        this.pagesBlack.value = 0
        this.pagesColor.value = 0
        this.pagesEmpty.value = 0
        priceBlack = 0
        priceColor = 0
      }
    }
    //one sheet side is double-sided printing  -> / 2
    price = ((((materialEl * sizeEl) / 2 ) * sheetsEL) * count) + priceBlack + priceColor
    return price
  }
}

export default PrintInner