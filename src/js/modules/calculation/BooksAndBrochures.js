import priceList from './components/prices/productPriceList';
import Foil from './components/Foil/Foil';
import PrintStandard from './components/Overprint/PrintStandard';
import PrintInner from './components/Overprint/PrintInner';
import getAmount from './components/ingredients/amount';
import getService from './components/ingredients/general';
import getWings from './components/ingredients/wings';
import Decimal from 'decimal.js';

//books and brochures
export class BooksAndBrochures {
    constructor() {
        this.theFormProduct = document.forms['product-2'];
        this.variables={
            count:'product-2-count',
            size: 'product-2-size',
            material: 'product-2-material',
            sheetsInner: 'product-2-sheets-inner',
            sheetsCover: 'product-2-sheets-cover',
            crease: 'product-1-crease',
            corners: 'card-corners',
            printCover: 'product-2-print',
            foil: 'product-2-foil',
            cover: 'product-2-cover',
            binding: 'product-2-binding',
            wings: 'product-2-wings',
            pagesInner: 'product-2-pages-count',
            pagesBlack: 'product-2-pages-black',
            pagesColor: 'product-2-pages-color',
            pagesEmpty: 'product-2-pages-empty',
            resultSpan: '.product-2-price-result span',
            printInnerCount: 'product-2-pages-count',
            printInnerBlack: 'product-2-pages-black',
            printInnerColor: 'product-2-pages-color',
            printInnerEmpty: 'product-2-pages-empty',
            printSTselect: 'product-2-print',
            printNone: 'product-2-c1',
            print_4_0_color: 'product-2-c2',
            print_4_1_color: 'product-2-c3',
            print_4_4_color: 'product-2-c4',
            print_1_0_color: 'product-2-c5',
            print_1_1_color: 'product-2-c6',
            print_1_0_black: 'product-2-c7',
            print_1_1_black: 'product-2-c8',
            foilSelect: 'product-2-foil',
            foilNone: 'product-2-d1',
            foilGloss_oneSided: 'product-2-d2',
            foilMat_oneSided: 'product-2-d3',
            foilSoftTuch_oneSided: 'product-2-d4',
            foilGloss_twoSided: 'product-2-d5',
            foilMat_twoSided: 'product-2-d6',
            foilSoftTuch_twoSided: 'product-2-d7',
            reset: '.reset'
        };

        const {
            count, 
            size, 
            material, 
            sheetsInner, 
            sheetsCover, 
            printCover, 
            foil, 
            cover, 
            binding, 
            wings, 
            pagesInner, 
            pagesBlack, 
            pagesColor,
            pagesEmpty,
            resultSpan,
            printInnerCount,
            printInnerBlack,
            printInnerColor,
            printInnerEmpty,
            printSTselect,
            printNone,
            print_4_0_color,
            print_4_1_color,
            print_4_4_color,
            print_1_0_color,
            print_1_1_color,
            print_1_0_black,
            print_1_1_black,
            foilSelect,
            foilNone,
            foilGloss_oneSided,
            foilMat_oneSided,
            foilSoftTuch_oneSided,
            foilGloss_twoSided,
            foilMat_twoSided,
            foilSoftTuch_twoSided,
        } = this.variables

        this.printInner = new PrintInner(
            printInnerCount, 
            printInnerBlack, 
            printInnerColor, 
            printInnerEmpty
        );

        this.printStandard = new PrintStandard(
            this.theFormProduct, 
            printSTselect, 
            printNone, 
            print_4_0_color,
            print_4_1_color,
            print_4_4_color,
            print_1_0_color,
            print_1_1_color,
            print_1_0_black,
            print_1_1_black,
        );

        this.foil = new Foil(
            this.theFormProduct, 
            foilSelect,
            foilNone,
            foilGloss_oneSided,
            foilMat_oneSided,
            foilSoftTuch_oneSided,
            foilGloss_twoSided,
            foilMat_twoSided,
            foilSoftTuch_twoSided,
            priceList.foilPrice
        );

        this.result = document.querySelector(resultSpan)
        document.getElementById(pagesInner).addEventListener('change', this.getProductPrice.bind(this));
        document.getElementById(pagesBlack).addEventListener('change', this.getProductPrice.bind(this));
        document.getElementById(pagesColor).addEventListener('change', this.getProductPrice.bind(this));
        document.getElementById(pagesEmpty).addEventListener('change', this.getProductPrice.bind(this));
        document.getElementById(sheetsInner).addEventListener('change', this.getProductPrice.bind(this));
        document.getElementById(count).addEventListener('change', this.getProductPrice.bind(this))
        document.getElementById(size).addEventListener('change', this.getProductPrice.bind(this))
        document.getElementById(material).addEventListener('change', this.getProductPrice.bind(this))
        document.getElementById(cover).addEventListener('change', this.getProductPrice.bind(this))
        document.getElementById(printCover).addEventListener('change', this.getProductPrice.bind(this));
        document.getElementById(sheetsCover).addEventListener('change', this.getProductPrice.bind(this))
        document.getElementById(foil).addEventListener('change', this.getProductPrice.bind(this))
        document.getElementById(binding).addEventListener('change', this.getProductPrice.bind(this))
        document.getElementById(wings).addEventListener('click', this.getProductPrice.bind(this))
        this.resetValues()
        this.getProductPrice()
    }

    getProductPrice() {
        const count = getAmount(this.variables.count)
        const sizeProd = getService(this.variables.size, this.theFormProduct, priceList.productSize)
        const materialProd = getService(this.variables.material, this.theFormProduct, priceList.productMaterial)
        const coverMaterial = getService(this.variables.cover, this.theFormProduct, priceList.productCover)
        const sheetsForCover = getService(this.variables.sheetsCover, this.theFormProduct, priceList.productSheets)
        const sheetsForInner = getService(this.variables.sheetsInner, this.theFormProduct, priceList.productSheets)
        const binding = getService(this.variables.binding, this.theFormProduct, priceList.productBinding)
        const printForCover = this.printStandard.getPricePrint(count, (sizeProd * 2))
        const foilForCover = this.foil.getPriceFoil(count, (sizeProd * 2))
        const wings = getWings(count, sizeProd, coverMaterial, printForCover, sheetsForCover, foilForCover, this.theFormProduct, this.variables.wings)
        const printInner = this.printInner.getPriceInnerPrint(count, sizeProd, materialProd, sheetsForInner)

        // calculation of the all amount--------------------------------------->
        const sumOfvalues = (((((sizeProd * 2) * coverMaterial) * sheetsForCover) 
          + printInner + binding) * count) + foilForCover + printForCover + wings
        //----------------------------------------------------------------------//
        
        const productPrice = new Decimal(sumOfvalues)
        this.result.textContent = productPrice.toFixed(2)
    }

    resetValues() {
        let result = 0
        const reset = document.querySelectorAll(this.variables.reset)
        reset.forEach(res => res.addEventListener('click', () => this.result.textContent = result.toFixed(2)))
    }
}