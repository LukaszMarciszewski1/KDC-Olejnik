const getService = function (select, theFormProduct, priceList) {
  const selected = theFormProduct.elements[select]
  const price = priceList[selected.value]
  return price
}
export default getService
