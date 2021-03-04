export class Slider {
    constructor(selectPrint, productContainer) {
        this.selectPrint = selectPrint
        this.productContainer = productContainer

        this.selectPrint.forEach(select => select.addEventListener('click', () => this.addClassBtn(select)))
    }

    productPosition() {
        const activeItem = this.selectPrint.findIndex(item => item.classList.contains('select-print-item--active'))
        const size = this.productContainer[0].clientWidth
        this.productContainer.forEach(product => {
            product.style.transform = 'translateX(' + (-activeItem * size) + 'px)'
        })
    }

    addClassBtn(select) {
        this.selectPrint.forEach(select => select.classList.remove('select-print-item--active'))
        select.classList.add('select-print-item--active')
        this.productPosition()
    }
}