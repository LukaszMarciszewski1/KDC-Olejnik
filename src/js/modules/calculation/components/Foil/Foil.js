class Foil {
  constructor(
    theProductForm,
    selectForm,
    sel1,
    sel2,
    sel3,
    sel4,
    sel5,
    sel6,
    sel7,
    foilPrice
  ) {
    this.sel1 = sel1 //none foil
    this.sel2 = sel2 //gloss one-sided
    this.sel3 = sel3 //mat one-sided
    this.sel4 = sel4 //soft-tuch one-sided
    this.sel5 = sel5 //gloss two-sided
    this.sel6 = sel6 //mat two-sided
    this.sel7 = sel7 //soft-tuch two-sided
    this.theProductForm = theProductForm
    this.selected = this.theProductForm.elements[selectForm]
    this.price = foilPrice
  }
  getPriceFoil(countEl, sizeEl) {
    const sizeSRA3 = 0.12474 //per square meter (0.320 * 0.450)mm
    let numberEl = sizeEl / sizeSRA3
    if (numberEl > 0.5 && numberEl < 1) numberEl = 1 //if the b4 format has been selected, its value is equal to A3
    if (numberEl > 0.25 && numberEl < 0.5) numberEl = 0.5
    let modifier = Math.ceil(numberEl * countEl)
    let price = 0

    if (
      this.selected.value === this.sel2 ||
      this.selected.value === this.sel3 ||
      this.selected.value === this.sel4
    ) {
      price = this.price * modifier
    } else if (
      this.selected.value === this.sel5 ||
      this.selected.value === this.sel6 ||
      this.selected.value === this.sel7
    ) {
      price = this.price * 2 * modifier
    } else {
      price = 0
    }
    return price
  }
}
export default Foil
