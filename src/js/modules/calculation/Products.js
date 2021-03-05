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
        this.count = document.getElementById('product-1-count').addEventListener('change', this.getProduct_Price.bind(this))
        this.size = document.getElementById('product-1-size').addEventListener('change', this.getProduct_Price.bind(this))
        this.material = document.getElementById('product-1-material').addEventListener('change', this.getProduct_Price.bind(this))
        this.sheets = document.getElementById('product-1-sheets').addEventListener('change', this.getProduct_Price.bind(this))
        this.crease = document.getElementById('product-1-crease').addEventListener('change', this.getProduct_Price.bind(this))
        this.corners = document.getElementById('card-corners').addEventListener('click', this.getProduct_Price.bind(this))
        this.printPrice = document.getElementById('product-1-print').addEventListener('change', this.getProduct_Price.bind(this));
        this.foilPrice = document.getElementById('product-1-foil').addEventListener('change', this.getProduct_Price.bind(this));
        this.result = document.querySelector('.product-1-price-result span')
        this.refreshPage()
        this.getProduct_Price()
    }
    getProduct_Count() {
        let count = parseInt(document.getElementById('product-1-count').value);
        return count
    }
    getProduct_Size() {
        let selected = this.theFormProduct.elements['product-1-size'];
        let price = priceList.productSize[selected.value];
        return price
    }
    getProduct_Material() {
        let selected = this.theFormProduct.elements['product-1-material'];
        let price = priceList.productMaterial[selected.value];
        return price
    }
    getProduct_Crease() {
        let selected = this.theFormProduct.elements['product-1-crease'];
        let price = priceList.productCrease[selected.value];
        return price;
    }
    getProduct_Sheets() {
        let selected = this.theFormProduct.elements['product-1-sheets'];
        let price = priceList.productSheets[selected.value];
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

    getProduct_Price() {
        const count = this.getProduct_Count()
        const sizeProd = this.getProduct_Size()
        const materialProd = this.getProduct_Material()
        const creaseProd = this.getProduct_Crease()
        const sheetsProd = this.getProduct_Sheets()
        const cornersProd = this.getCardCorners()
        const printProd = this.printStandard.getPricePrint(count, sizeProd)
        const foilProd = this.foil.getPriceFoil(count, sizeProd)

        const productPrice = ((((sizeProd * materialProd) * sheetsProd) + creaseProd + cornersProd) * count) + printProd + foilProd;
        this.result.textContent = productPrice.toFixed(3)
    }
    refreshPage() {
        let priceSize = priceList.productSize['product-1-a1'];
        let priceMaterial = priceList.productMaterial['product-1-b1'];
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

        this.pages = document.getElementById('product-2-pages-count').addEventListener('change', this.getProduct_Price.bind(this));
        this.pagesBlack = document.getElementById('product-2-pages-black').addEventListener('change', this.getProduct_Price.bind(this));
        this.pagesColor = document.getElementById('product-2-pages-color').addEventListener('change', this.getProduct_Price.bind(this));
        this.pagesEmpty = document.getElementById('product-2-pages-empty').addEventListener('change', this.getProduct_Price.bind(this));
        this.sheetsForInner = document.getElementById('product-2-sheets-inner').addEventListener('change', this.getProduct_Price.bind(this));

        this.count = document.getElementById('product-2-count').addEventListener('change', this.getProduct_Price.bind(this))
        this.size = document.getElementById('product-2-size').addEventListener('change', this.getProduct_Price.bind(this))
        this.material = document.getElementById('product-2-material').addEventListener('change', this.getProduct_Price.bind(this))
        this.cover = document.getElementById('product-2-cover').addEventListener('change', this.getProduct_Price.bind(this))
        this.printStandardPrice = document.getElementById('product-2-print').addEventListener('change', this.getProduct_Price.bind(this));
        this.sheetsForCover = document.getElementById('product-2-sheets-cover').addEventListener('change', this.getProduct_Price.bind(this))
        this.foilPrice = document.getElementById('product-2-foil').addEventListener('change', this.getProduct_Price.bind(this))
        this.binding = document.getElementById('product-2-binding').addEventListener('change', this.getProduct_Price.bind(this))
        this.wings = document.getElementById('product-2-wings').addEventListener('click', this.getProduct_Price.bind(this))

        this.result = document.querySelector('.product-2-price-result span')
        this.resetPage()
        this.getProduct_Price()
    }

    getProduct_Count() {
        let count = parseInt(document.getElementById('product-2-count').value);
        return count
    }
    getProduct_Size() {
        let selected = this.theFormProduct.elements['product-2-size'];
        let price = priceList.productSize[selected.value];
        console.log()
        return price
    }
    getProduct_Material() {
        const enableSheets = document.querySelector('.enable-sheets')
        let selected = this.theFormProduct.elements['product-2-material'];
        let price = priceList.productMaterial[selected.value];
        const element = selected.options.selectedIndex
        if (element >= 10) {
            enableSheets.disabled = false
            enableSheets.classList.remove('enable-sheets--active')
        } else {
            enableSheets.disabled = true
            enableSheets.classList.add('enable-sheets--active')
        }
        return price
    }
    getProduct_Cover() {
        let selected = this.theFormProduct.elements['product-2-cover'];
        let price = priceList.productCover[selected.value];
        return price
    }
    getProduct_Binding() {
        let selected = this.theFormProduct.elements['product-2-binding'];
        let price = priceList.productBinding[selected.value];
        return price
    }
    getProductSheetsForCover() {
        let selected = this.theFormProduct.elements['product-2-sheets-cover'];
        let price = priceList.productSheets[selected.value];
        return price;
    }
    getProductSheetsForInner() {
        let selected = this.theFormProduct.elements['product-2-sheets-inner'];
        let price = priceList.productSheets[selected.value];
        const enableMaterial = [...document.querySelectorAll('.enable')]
        if (selected.value === 'product-2-f1') {
            enableMaterial.forEach(el => {
                el.disabled = true
                el.classList.add('enable-sheets--active')
            })
        } else {
            enableMaterial.forEach(el => {
                el.disabled = false
                el.classList.remove('enable-sheets--active')
            })
        }
        return price;
    }

    getProductWings(count, size, material, print, sheetsForCover, foil) {
        let price = 0;
        let selected = this.theFormProduct.elements['product-2-wings'];
        if (selected.checked == true && this.getProduct_Cover() > 0) {
            price = (((size * material) * sheetsForCover) * count) + print + foil
        } else {
            price = 0;
        }
        return price;
    }

    getProduct_Price() {
        const count = this.getProduct_Count()
        const sizeProd = this.getProduct_Size()
        const materialProd = this.getProduct_Material()
        const coverMaterial = this.getProduct_Cover()
        const sheetsForCover = this.getProductSheetsForCover()
        const sheetsForInner = this.getProductSheetsForInner()
        const binding = this.getProduct_Binding()
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

export class Products {
    constructor() {
        this.product1 = new Product1()
        this.product2 = new Product2()
    }
}