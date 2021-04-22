const getWings = (count, size, material, print, sheetsForCover, foil, theFormProduct, select) => {
    let price = 0;
    const selected = theFormProduct.elements[select];
    if (selected.checked == true && this.getProductCover() > 0) {
        price = (((size * material) * sheetsForCover) * count) + (print / 2) + (foil / 2)
    } else {
        price = 0;
    }
    return price;
}

export default getWings