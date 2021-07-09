//SIZE conversion to square meter
const productSize = new Array()
productSize['product-1-a1'] = 0.12474 //a3
productSize['product-1-a2'] = 0.06237 //a4
productSize['product-1-a3'] = 0.031185 //a5
productSize['product-1-a4'] = 0.0155925 //a6
productSize['product-1-a5'] = 0.02079 //dl
productSize['product-1-a6'] = 0.088 //b4
productSize['product-1-a7'] = 0.044 //b5
productSize['product-1-a8'] = 0.005 //wizytówki
productSize['product-2-a1'] = 0.06237 //a4
productSize['product-2-a2'] = 0.031185 //a5
productSize['product-2-a3'] = 0.0155925 //a6
productSize['product-2-a4'] = 0.088 //b4
productSize['product-2-a5'] = 0.044 //b5
productSize['product-2-a6'] = 0.022 //b6

//MATERIAL
// SIZE(A3) * productMaterial(modifier) = MATERIAL PRICE --- for example -> 115g kreda SRA3 0,118 - the price of chalk in sra3 format is 0,118 --->
// size(0.12474) * productMaterial(0.946) = 0,118 )
const productMaterial = new Array()
productMaterial['product-1-b1'] = 0.83 //100g kreda SRA3 0,103 0,25gr/ark B1
productMaterial['product-1-b2'] = 0.946 //115g kreda SRA3 0,118 0,28gr/ark B1
productMaterial['product-1-b3'] = 1.066 //130g kreda SRA3 0,133 0,32gr/ark B1
productMaterial['product-1-b4'] = 1.235 //150g kreda SRA3 0,154 0,37gr/ark B1
productMaterial['product-1-b5'] = 1.395 //170g kreda SRA3 0,174 0,42gr/ark B1
productMaterial['product-1-b6'] = 1.643 //200g kreda SRA3 0,205 0,49gr/ark B1
productMaterial['product-1-b7'] = 2.116 //250g kreda SRA3 0,264 0,63gr/ark B1
productMaterial['product-1-b8'] = 2.613 //300g kreda SRA3 0,326 0,78gr/ark B1
productMaterial['product-1-b9'] = 3.094 //350g kreda SRA3 0,386 0,92gr/ark B1
productMaterial['product-1-b10'] = 0.986 //90g satyna SRA3 0,123
productMaterial['product-1-b11'] = 1.09 //100g satyna SRA3 0,136
productMaterial['product-1-b12'] = 1.315 //120g satyna SRA3 0,164
productMaterial['product-1-b13'] = 1.756 //160g satyna SRA3 0,219
productMaterial['product-1-b14'] = 2.405 //200g satyna SRA3 0,300
productMaterial['product-1-b15'] = 3.159 //250g satyna SRA3 0,394
productMaterial['product-1-b16'] = 3.792 //300g satyna SRA3 0,473
productMaterial['product-1-b17'] = 4.746 //350g satyna SRA3 0,592
productMaterial['product-1-b18'] = 4.746 //300g DNS SRA3 0,592 -------------------------------
productMaterial['product-2-b1'] = 0.57 //60g creamy A1-0,0302(0.126) B1-0,0302(0.169)
productMaterial['product-2-b2'] = 0.6612 //70g creamy A1-0,035(0.147) B1-0,0352(0.197)
productMaterial['product-2-b3'] = 0.7555 //80g creamy A1-0,0401(0.168) B1-0,0402(0.225)
productMaterial['product-2-b4'] = 0.736 //70g lux cream A1-0,0391(0.164) B1-0,0392(0.219)
productMaterial['product-2-b5'] = 0.8535 //80g lux cream A1-0,0449(0.188) B1-0,045(0.252)
productMaterial['product-2-b6'] = 0.9501 //90g lux cream A1-0,0506(0.212) B1-0,0506(0.283)
productMaterial['product-2-b7'] = 0.538 //70g offset A1-0,0297(0.124) B1-0,0286(0.16)
productMaterial['product-2-b8'] = 0.6355 //80g offset A1-0,0329(0.138) B1-0,0339(0.19)
productMaterial['product-2-b9'] = 0.682 //90g offset A1-0,0370(0.155) B1-0,0357(0.20)
productMaterial['product-2-b10'] = 0.7698 //100g offset A1-0,0412(0.173) B1-0,0411(0.23)
productMaterial['product-2-b11'] = 0.78 //90g kreda SRA3-0,09? A1-0,0404(0.169) B1-0,0410(0.23)------------------------
productMaterial['product-2-b12'] = 0.83 //100g kreda SRA3-0,103 A1-0,0435 B1-0,0446(0.25)
productMaterial['product-2-b13'] = 0.946 //115g kreda SRA3-0,118 A1-0,0488(0.205) B1-0,0499(0.28)
productMaterial['product-2-b14'] = 1.066 //130g kreda SRA3-0,133 A1-0,0552(0.231) B1-0,0571(0.32)
productMaterial['product-2-b15'] = 1.235 //150g kreda SRA3-0,154 A1-0,0637(0.267) B1-0,0660(0.37)
productMaterial['product-2-b16'] = 0.986 //90g satyna SRA3-0,123
productMaterial['product-2-b17'] = 1.09 //100g satyna SRA3-0,136
productMaterial['product-2-b18'] = 1.315 //120g satyna SRA3-0,164
productMaterial['product-2-b19'] = 1.756 //160g satyna SRA3-0,219

//SHEETS
// modificator(productSheets) * ( y * size) = price
// price / modificator(productSheets) = result => result / size(format(B1 or A1) / A3) = result => result / A3 = modificator(productCover)
const productSheets = new Array()
productSheets['product-1-f1'] = 1 //SRA3
productSheets['product-1-f2'] = 0.4237 //B1 0.389
productSheets['product-1-f3'] = 0.4346 //A1
productSheets['product-2-f1'] = 1 //SRA3 srodek
productSheets['product-2-f2'] = 0.4237 //B1 srodek 0.4237
productSheets['product-2-f3'] = 0.4346 //A1 srodek a1 / 4 (a3)
productSheets['product-2-g1'] = 1 //SRA3 okładka
productSheets['product-2-g2'] = 0.4237 //B1 okładka
productSheets['product-2-g3'] = 0.441 //A1 okładka 0.4346  0.4480;

//MATERIAL COVER
const productCover = new Array()
productCover['product-2-h1'] = 0 //brak
productCover['product-2-h2'] = 2.5813 //SRA3 karton gc1 230g
productCover['product-2-h3'] = 2.7142 //SRA3 karton gc1 250g
productCover['product-2-h4'] = 3.257 //SRA3 karton gc1 300g
productCover['product-2-h5'] = 1.643 //200g kreda SRA3 0,264
productCover['product-2-h6'] = 2.116 //250g kreda SRA3 0,264
productCover['product-2-h7'] = 2.613 //300g kreda SRA3 0,326
productCover['product-2-h8'] = 3.094 //350g kreda SRA3 0,386
productCover['product-2-h9'] = 2.405 //200g satyna SRA3 0,394
productCover['product-2-h10'] = 3.159 //250g satyna SRA3 0,394
productCover['product-2-h11'] = 3.792 //300g satyna SRA3 0,473
productCover['product-2-h12'] = 4.746 //350g satyna SRA3 0,592

//CREASE
const productCrease = new Array()
productCrease['product-1-e1'] = 0
productCrease['product-1-e2'] = 0.1
productCrease['product-1-e3'] = 0.2
productCrease['product-1-e4'] = 0.3
productCrease['product-1-e5'] = 0.4
productCrease['product-1-e6'] = 0.5

//BINDING
const productBinding = new Array()
productBinding['product-2-e1'] = 0
productBinding['product-2-e2'] = 0.3
productBinding['product-2-e3'] = 0.5
productBinding['product-2-e4'] = 0.6

//FOIL
const foilPrice = 0.3

//CORNERS
const corners = 0.1

const priceList = {
  productSize,
  productMaterial,
  productSheets,
  productCover,
  productCrease,
  productBinding,
  foilPrice,
  corners,
}
export default priceList
