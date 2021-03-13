export class Info {
    constructor(){
        this.infoBtnClose = document.querySelector('.info-close')
        this.infoBtnOpen = document.querySelector('.info-btn')
        this.infoContainer = document.querySelector('.info-container')

        this.infoBtnOpen.addEventListener('click', this.openInfo.bind(this))
        this.infoBtnClose.addEventListener('click', this.closeInfo.bind(this))
    }
    openInfo(){
        this.infoContainer.classList.toggle('info-container--active')
        this.infoBtnOpen.classList.add('info-btn--active')
    }
    closeInfo(){
        this.infoContainer.classList.remove('info-container--active')
        this.infoBtnOpen.classList.remove('info-btn--active')
    }
}