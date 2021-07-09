export class Slider {
  constructor() {
    this.selectPrint = [...document.querySelectorAll('.select-print-btn')]
    this.productContainer = [...document.querySelectorAll('.product')]

    this.selectPrint.forEach((select) =>
      select.addEventListener('click', () => this.activeSlide(select))
    )
  }

  productPosition() {
    const activeItem = this.selectPrint.findIndex((item) =>
      item.classList.contains('select-print-btn--active')
    )
    const size = this.productContainer[0].clientWidth
    this.productContainer.forEach((product) => {
      product.style.transform = 'translateX(' + -activeItem * size + 'px)'
    })
  }

  activeSlide(select) {
    this.selectPrint.forEach((select) =>
      select.classList.remove('select-print-btn--active')
    )
    select.classList.add('select-print-btn--active')
    this.productPosition()
  }
}
