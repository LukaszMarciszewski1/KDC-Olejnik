import priceList from './components/prices/productPriceList';
import Foil from './components/Foil/Foil';
import PrintStandard from './components/Overprint/PrintStandard';
import getCorners from './components/ingredients/corners.js';
import getAmount from './components/ingredients/amount.js';
import getService from './components/ingredients/general.js';
import Decimal from 'decimal.js';

//standard prints
export class NormalProducts {
    constructor() {
        this.theFormProduct = document.forms['product-1'];
        this.variables = {
            count: 'product-1-count',
            size: 'product-1-size',
            material: 'product-1-material',
            sheets: 'product-1-sheets',
            crease: 'product-1-crease',
            corners: 'card-corners',
            print: 'product-1-print',
            foil: 'product-1-foil',
            resultSpan: '.product-1-price-result span',
            printSelect: 'product-1-print',
            printNone: 'product-1-c1',
            print_4_0_color: 'product-1-c2',
            print_4_1_color: 'product-1-c3',
            print_4_4_color: 'product-1-c4',
            print_1_0_color: 'product-1-c5',
            print_1_1_color: 'product-1-c6',
            print_1_0_black: 'product-1-c7',
            print_1_1_black: 'product-1-c8',
            foilSelect: 'product-1-foil',
            foilNone: 'product-1-d1',
            foilGloss_oneSided: 'product-1-d2',
            foilMat_oneSided: 'product-1-d3',
            foilSoftTuch_oneSided: 'product-1-d4',
            foilGloss_twoSided: 'product-1-d5',
            foilMat_twoSided: 'product-1-d6',
            foilSoftTuch_twoSided: 'product-1-d7',
            reset: '.reset'
        }
        this.initialParameters = {
            productSize: 'product-1-a1',
            productMaterial: 'product-1-b1'
        }

        const {
            count,
            size,
            material,
            sheets,
            crease,
            corners,
            print,
            foil,
            resultSpan,
            printSelect,
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
        } = this.variables;

        this.printStandard = new PrintStandard(
            this.theFormProduct,
            printSelect,
            printNone,
            print_4_0_color,
            print_4_1_color,
            print_4_4_color,
            print_1_0_color,
            print_1_1_color,
            print_1_0_black,
            print_1_1_black
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
        document.getElementById(count).addEventListener('change', this.getProductPrice.bind(this))
        document.getElementById(size).addEventListener('change', this.getProductPrice.bind(this))
        document.getElementById(material).addEventListener('change', this.getProductPrice.bind(this))
        document.getElementById(sheets).addEventListener('change', this.getProductPrice.bind(this))
        document.getElementById(crease).addEventListener('change', this.getProductPrice.bind(this))
        document.getElementById(corners).addEventListener('click', this.getProductPrice.bind(this))
        document.getElementById(print).addEventListener('change', this.getProductPrice.bind(this));
        document.getElementById(foil).addEventListener('change', this.getProductPrice.bind(this));
        this.resetValues()
        this.getProductPrice()
    }

    getProductPrice() {
        const count = getAmount(this.variables.count)
        const sizeProd = getService(this.variables.size, this.theFormProduct, priceList.productSize)
        const materialProd = getService(this.variables.material, this.theFormProduct, priceList.productMaterial)
        const creaseProd = getService(this.variables.crease, this.theFormProduct, priceList.productCrease)
        const sheetsProd = getService(this.variables.sheets, this.theFormProduct, priceList.productSheets)
        const cornersProd = getCorners(this.variables.corners, this.theFormProduct, priceList.corners)
        const printProd = this.printStandard.getPricePrint(count, sizeProd, priceList)
        const foilProd = this.foil.getPriceFoil(count, sizeProd)
        
        // calculation of the all amount---------------------------------->
        const sumOfvalues = ((((sizeProd * materialProd) * sheetsProd) 
          + creaseProd + cornersProd) * count) + printProd + foilProd;
        //----------------------------------------------------------------//  

        const productPrice = new Decimal(sumOfvalues)
        this.result.textContent = productPrice.toFixed(2)
    }
    resetValues() {
        const {productSize, productMaterial} = this.initialParameters
        const priceSize = priceList.productSize[productSize];
        const priceMaterial = priceList.productMaterial[productMaterial];
        let result = priceSize * priceMaterial
        const reset = document.querySelectorAll(this.variables.reset)
        reset.forEach(res => res.addEventListener('click', () => this.result.textContent = result.toFixed(2)))
    }
}