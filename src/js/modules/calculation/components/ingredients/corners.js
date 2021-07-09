const getCorners = (select, theFormProduct, priceList) => {
  let cornersPrice = 0
  const selectedCorners = theFormProduct.elements[select]
  if (selectedCorners.checked == true) {
    cornersPrice = priceList
  } else {
    cornersPrice = 0
  }
  return cornersPrice
}

export default getCorners
