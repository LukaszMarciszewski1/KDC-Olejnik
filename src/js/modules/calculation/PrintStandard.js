import 
printPrice
 from './prices/printPrice.js';

export class PrintStandard {
    constructor(theProductForm, selectForm, prodC1, prodC2, prodC3, prodC4, prodC5, prodC6, prodC7, prodC8) {
      this.prodC1 = prodC1 //none print
      this.prodC2 = prodC2 //4 + 0 color
      this.prodC3 = prodC3 //4 + 1 color
      this.prodC4 = prodC4 //4 + 4 color
      this.prodC5 = prodC5 //1 + 0 color
      this.prodC6 = prodC6 //1 + 1 color
      this.prodC7 = prodC7 //1 + 1 black and white
      this.prodC8 = prodC8 //1 + 1 black and white
      this.theProductForm = theProductForm
      this.selected = this.theProductForm.elements[selectForm]
      // this.pricePrint = pricePrint
    }
    getPricePrint(countEl, sizeEl) {
      let price = 0
      const sizeSRA3 = 0.12474;
      let numberEl = sizeEl / sizeSRA3
      let modifier = numberEl * countEl
     
      //0.5 equals 1 click to A4 size
      if (numberEl > 0.5 && numberEl < 1) numberEl = 0.5  //if the format is larger than A4 and smaller than A3

      modifier = numberEl * countEl
      if (this.selected.value === this.prodC1) {
        price = printPrice.nonePrint
      }
      //color 4 + 0
      else if (this.selected.value === this.prodC2) {
        if (numberEl <= 0.5) {
          price = printPrice.SRA3_colorOneSided * modifier
        } else if (numberEl > 0.5) {
          price = printPrice.SRA3_colorOneSided * countEl
        }
      }
      //color 4 + 1
      else if (this.selected.value === this.prodC3) {
        if (numberEl <= 0.5) {
          price = printPrice.SRA3_colorAndBlack * modifier
        } else if (numberEl > 0.5) {
          price = printPrice.SRA3_colorAndBlack * countEl
        }
      }
      //color 4 + 4
      else if (this.selected.value === this.prodC4) {
        if (numberEl <= 0.5) {
          price = printPrice.SRA3_colorAndColor * modifier
        } else if (numberEl > 0.5) {
          price = printPrice.SRA3_colorAndColor * countEl
        }
      }
      //color 1 + 0
      else if (this.selected.value === this.prodC5) {
        if (numberEl <= 0.5) {
          price = printPrice.SRA3_blackOneSided * modifier
        } else if (numberEl > 0.5) {
          price = printPrice.SRA3_blackOneSided * countEl
        }
      }
      //color 1 + 1
      else if (this.selected.value === this.prodC6) {
        if (numberEl <= 0.5) {
          price = printPrice.SRA3_blackAndBlack * modifier
        } else if (numberEl > 0.5) {
          price = printPrice.SRA3_blackAndBlack * countEl
        }
      }
      //black 1 + 0 
      else if (this.selected.value === this.prodC7) {
        if (numberEl <= 0.5) {
          price = printPrice.SRA3_blackOneSidedBlack * modifier
        } else if (numberEl > 0.5) {
          price = printPrice.SRA3_blackOneSidedBlack * countEl
        }
      }
      //black 1 + 1
      else if (this.selected.value === this.prodC8) {
        if (numberEl < 0.5) {
          price = printPrice.SRA3_blackDubleSideBlack * modifier
        } else if (numberEl > 0.5) {
          price = printPrice.SRA3_blackDubleSideBlack * countEl
        }
      }
       else {
        price = 0
      }
      return price
    }
  }