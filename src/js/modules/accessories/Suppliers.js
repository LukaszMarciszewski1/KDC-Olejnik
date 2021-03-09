export class Suppliers {
    constructor(){
        this.suppliersBtnClose = document.querySelector('.suppliers-close')
        this.suppliersBtnOpen = document.querySelector('.suppliers-btn')
        this.suppliersContainer = document.querySelector('.suppliers-container')

        this.suppliersBtnOpen.addEventListener('click', this.openInfo.bind(this))
        this.suppliersBtnClose.addEventListener('click', this.closeInfo.bind(this))
    }
    openInfo(){
        this.suppliersContainer.classList.add('suppliers-container--active')
        this.suppliersBtnOpen.classList.add('suppliers-btn--active')
        
    }
    closeInfo(){
        this.suppliersContainer.classList.remove('suppliers-container--active')
        this.suppliersBtnOpen.classList.remove('suppliers-btn--active')
    }
}