export class Suppliers {
    constructor(){
        this.suppliersBtnClose = document.querySelector('.suppliers-close')
        this.suppliersBtnOpen = document.querySelector('.suppliers-btn')
        this.suppliersContainer = document.querySelector('.suppliers-container')

        this.suppliersBtnOpen.addEventListener('click', this.openSuppliers.bind(this))
        this.suppliersBtnClose.addEventListener('click', this.closeSuppliers.bind(this))
    }
    openSuppliers(){
        this.suppliersContainer.classList.add('suppliers-container--active')
        this.suppliersBtnOpen.classList.add('suppliers-btn--active')
        
    }
    closeSuppliers(){
        this.suppliersContainer.classList.remove('suppliers-container--active')
        this.suppliersBtnOpen.classList.remove('suppliers-btn--active')
    }
}