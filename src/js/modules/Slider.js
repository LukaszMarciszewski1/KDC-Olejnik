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

// function nextSlide() {
//     if (index == slides.length - 1) {
//       index = 0;
//     } else {
//       index++;
//     }
//     changeSlide();
//   }

//   function changeSlide() {
//     for (let i = 0; i < slides.length; i++) {
//       slides[i].classList.remove("header-slider__items--active");
//     }

//     slides[index].classList.add("header-slider__items--active");
//   }

//   function resetTimer(){
//     clearInterval(timer);
//     timer=setInterval(autoPlay, time);
// }

//   function autoPlay() {
//     nextSlide();
//     updatePagination()

//   }
// let timer = setInterval(autoPlay, time);
// }