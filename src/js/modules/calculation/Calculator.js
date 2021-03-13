import {
    priceList
} from './prices/productPriceList.js';
import {
    Foil
} from './Foil.js';
import {
    PrintStandard
} from './PrintStandard.js';
import {
    PrintInner
} from './PrintInner.js';

class Product1 {
    constructor() {
        this.theFormProduct = document.forms['product-1'];
        this.printStandard = new PrintStandard(this.theFormProduct, 'product-1-print', 'product-1-c1', 'product-1-c2', 'product-1-c3', 'product-1-c4', 'product-1-c5', 'product-1-c6', 'product-1-c7', 'product-1-c8')
        this.foil = new Foil(this.theFormProduct, 'product-1-foil', 'product-1-d1', 'product-1-d2', 'product-1-d3', 'product-1-d4', 'product-1-d5', 'product-1-d6', 'product-1-d7')
        this.count = document.getElementById('product-1-count').addEventListener('change', this.getProductPrice.bind(this))
        this.size = document.getElementById('product-1-size').addEventListener('change', this.getProductPrice.bind(this))
        this.material = document.getElementById('product-1-material').addEventListener('change', this.getProductPrice.bind(this))
        this.sheets = document.getElementById('product-1-sheets').addEventListener('change', this.getProductPrice.bind(this))
        this.crease = document.getElementById('product-1-crease').addEventListener('change', this.getProductPrice.bind(this))
        this.corners = document.getElementById('card-corners').addEventListener('click', this.getProductPrice.bind(this))
        this.printPrice = document.getElementById('product-1-print').addEventListener('change', this.getProductPrice.bind(this));
        this.foilPrice = document.getElementById('product-1-foil').addEventListener('change', this.getProductPrice.bind(this));

        this.result = document.querySelector('.product-1-price-result span')
        this.refreshPage()
        this.getProductPrice()
    }
    getProductCount() {
        const count = parseInt(document.getElementById('product-1-count').value);
        return count
    }
    getProductSize() {
        const selected = this.theFormProduct.elements['product-1-size'];
        const price = priceList.productSize[selected.value];
        const sheets = [...document.querySelectorAll('.sheet-1')]
        if (selected) {
            sheets.forEach(sheet => {
                if (selected.value === 'product-1-a1' || selected.value === 'product-1-a2' || selected.value === 'product-1-a3' || selected.value === 'product-1-a3') {
                    if (sheet.classList.contains('sheet-1-B1')) {
                        sheet.classList.add('disable-element')
                        sheet.disabled = true
                    } else {
                        sheet.classList.remove('disable-element')
                        sheet.disabled = false
                    }
                }
                if (selected.value === 'product-1-a4' || selected.value === 'product-1-a5' || selected.value === 'product-1-a6') {
                    if (sheet.classList.contains('sheet-1-A1')) {
                        sheet.classList.add('disable-element')
                        sheet.disabled = true
                    } else {
                        sheet.classList.remove('disable-element')
                        sheet.disabled = false
                    }
                }
            })
        }
        return price
    }
    getProductMaterial() {
        const selected = this.theFormProduct.elements['product-1-material'];
        const price = priceList.productMaterial[selected.value];
        
        return price
    }
    getProductCrease() {
        const selected = this.theFormProduct.elements['product-1-crease'];
        const price = priceList.productCrease[selected.value];
        return price;
    }
    getProductSheets() {
        const selected = this.theFormProduct.elements['product-1-sheets'];
        const price = priceList.productSheets[selected.value];
        return price;
    }
    getCardCorners() {
        let cornersPrice = 0;
        const priceForOneCorner = 0.1
        const selectedCorners = this.theFormProduct.elements["card-corners"];
        if (selectedCorners.checked == true) {
            cornersPrice = priceForOneCorner;
        } else {
            cornersPrice = 0;
        }
        return cornersPrice;
    }

    getProductPrice() {
        const count = this.getProductCount()
        const sizeProd = this.getProductSize()
        const materialProd = this.getProductMaterial()
        const creaseProd = this.getProductCrease()
        const sheetsProd = this.getProductSheets()
        const cornersProd = this.getCardCorners()
        const printProd = this.printStandard.getPricePrint(count, sizeProd)
        const foilProd = this.foil.getPriceFoil(count, sizeProd)

        const productPrice = ((((sizeProd * materialProd) * sheetsProd) + creaseProd + cornersProd) * count) + printProd + foilProd;
        this.result.textContent = productPrice.toFixed(3)
    }
    refreshPage() {
        const priceSize = priceList.productSize['product-1-a1'];
        const priceMaterial = priceList.productMaterial['product-1-b1'];
        let result = priceSize * priceMaterial
        const reset = document.querySelectorAll('.reset')
        reset.forEach(res => res.addEventListener('click', () => this.result.textContent = result.toFixed(3)))
    }
}

class Product2 {
    constructor() {
        this.theFormProduct = document.forms['product-2'];
        this.printInner = new PrintInner('product-2-pages-count', 'product-2-pages-black', 'product-2-pages-color', 'product-2-pages-empty')
        this.printStandard = new PrintStandard(this.theFormProduct, 'product-2-print', 'product-2-c1', 'product-2-c2', 'product-2-c3', 'product-2-c4', 'product-2-c5', 'product-2-c6')
        this.foil = new Foil(this.theFormProduct, 'product-2-foil', 'product-2-d1', 'product-2-d2', 'product-2-d3', 'product-2-d4', 'product-2-d5', 'product-2-d6', 'product-2-d7')

        this.pages = document.getElementById('product-2-pages-count').addEventListener('change', this.getProductPrice.bind(this));
        this.pagesBlack = document.getElementById('product-2-pages-black').addEventListener('change', this.getProductPrice.bind(this));
        this.pagesColor = document.getElementById('product-2-pages-color').addEventListener('change', this.getProductPrice.bind(this));
        this.pagesEmpty = document.getElementById('product-2-pages-empty').addEventListener('change', this.getProductPrice.bind(this));
        this.sheetsForInner = document.getElementById('product-2-sheets-inner').addEventListener('change', this.getProductPrice.bind(this));

        this.count = document.getElementById('product-2-count').addEventListener('change', this.getProductPrice.bind(this))
        this.size = document.getElementById('product-2-size').addEventListener('change', this.getProductPrice.bind(this))
        this.material = document.getElementById('product-2-material').addEventListener('change', this.getProductPrice.bind(this))
        this.cover = document.getElementById('product-2-cover').addEventListener('change', this.getProductPrice.bind(this))
        this.printStandardPrice = document.getElementById('product-2-print').addEventListener('change', this.getProductPrice.bind(this));
        this.sheetsForCover = document.getElementById('product-2-sheets-cover').addEventListener('change', this.getProductPrice.bind(this))
        this.foilPrice = document.getElementById('product-2-foil').addEventListener('change', this.getProductPrice.bind(this))
        this.binding = document.getElementById('product-2-binding').addEventListener('change', this.getProductPrice.bind(this))
        this.wings = document.getElementById('product-2-wings').addEventListener('click', this.getProductPrice.bind(this))

        this.result = document.querySelector('.product-2-price-result span')
        this.resetPage()
        this.getProductPrice()

    }

    getProductCount() {
        const count = parseInt(document.getElementById('product-2-count').value);
        return count
    }
    getProductSize() {
        const selected = this.theFormProduct.elements['product-2-size'];
        const price = priceList.productSize[selected.value];
        const sheets = [...document.querySelectorAll('.sheet-2')]
        if (selected) {
            sheets.forEach(sheet => {
                if (selected.value === 'product-2-a1' || selected.value === 'product-2-a2' || selected.value === 'product-2-a3') {
                    if (sheet.classList.contains('sheet-2-B1')) {
                        sheet.classList.add('disable-element')
                        sheet.disabled = true
                    } else {
                        sheet.classList.remove('disable-element')
                        sheet.disabled = false
                    }
                }
                if (selected.value === 'product-2-a4' || selected.value === 'product-2-a5' || selected.value === 'product-2-a6') {
                    if (sheet.classList.contains('sheet-2-A1')) {
                        sheet.classList.add('disable-element')
                        sheet.disabled = true
                    } else {
                        sheet.classList.remove('disable-element')
                        sheet.disabled = false
                    }
                }
            })
        }
        return price
    }
    getProductMaterial() {
        const selected = this.theFormProduct.elements['product-2-material'];
        const price = priceList.productMaterial[selected.value];
        return price
    }
    getProductCover() {
        const selected = this.theFormProduct.elements['product-2-cover'];
        const price = priceList.productCover[selected.value];
        return price
    }
    getProductBinding() {
        const selected = this.theFormProduct.elements['product-2-binding'];
        const price = priceList.productBinding[selected.value];
        return price
    }
    getProductSheetsForCover() {
        const selected = this.theFormProduct.elements['product-2-sheets-cover'];
        const price = priceList.productSheets[selected.value];
        return price;
    }
    getProductSheetsForInner() {
        const selected = this.theFormProduct.elements['product-2-sheets-inner'];
        const price = priceList.productSheets[selected.value];
        const enabeleMaterialForInner = [...document.querySelectorAll('.condition')]
        if(selected){
            enabeleMaterialForInner.forEach(el =>{
                if(selected.value === 'product-2-f1'){
                   el.classList.add('disable-element')
                   el.disabled = true
                }
                else{
                    el.classList.remove('disable-element')
                    el.disabled = false
                }
            })
        }
        return price;
    }

    getProductWings(count, size, material, print, sheetsForCover, foil) {
        let price = 0;
        const selected = this.theFormProduct.elements['product-2-wings'];
        if (selected.checked == true && this.getProductCover() > 0) {
            price = (((size * material) * sheetsForCover) * count) + print + foil
        } else {
            price = 0;
        }
        return price;
    }

    getProductPrice() {
        const count = this.getProductCount()
        const sizeProd = this.getProductSize()
        const materialProd = this.getProductMaterial()
        const coverMaterial = this.getProductCover()
        const sheetsForCover = this.getProductSheetsForCover()
        const sheetsForInner = this.getProductSheetsForInner()
        const binding = this.getProductBinding()
        const printForCover = this.printStandard.getPricePrint(count, (sizeProd * 2))
        const foilForCover = this.foil.getPriceFoil(count, (sizeProd * 2))
        const wings = this.getProductWings(count, sizeProd, coverMaterial, (printForCover / 2), sheetsForCover, (foilForCover / 2))
        const printInner = this.printInner.getPriceInnerPrint(count, sizeProd, materialProd, sheetsForInner)
        let productPrice = (((((sizeProd * 2) * coverMaterial) * sheetsForCover) + printInner + binding) * count) + foilForCover + printForCover + wings
        this.result.textContent = productPrice.toFixed(2)
    }

    resetPage() {
        let result = 0
        const reset = document.querySelectorAll('.reset')
        reset.forEach(res => res.addEventListener('click', () => this.result.textContent = result.toFixed(2)))
    }
}

export class Calculator {
    constructor() {
        this.product1 = new Product1()
        this.product2 = new Product2()
    }
}