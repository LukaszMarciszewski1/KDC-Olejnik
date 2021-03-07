export class Notes {
    constructor() {
        this.container = document.querySelector('.calculator')
        this.dragItem = document.querySelector('.top-bar');
        this.dragElement = document.querySelector('.notes-container')
        this.notesBtn = document.querySelector('.notes-btn')
        this.textarea = document.querySelector('.textarea')
        this.saveBtn = document.querySelector('.save-notes')
        this.storedTxt = localStorage.getItem('notesTxt')
        

        this.active = false;
        this.currentX = null;
        this.currentY = null;
        this.initialX = null;
        this.initialY = null;
        this.xOffset = 0;
        this.yOffset = 0;

        this.notesBtn.addEventListener("click", this.openNotes.bind(this));
        this.dragItem.lastElementChild.addEventListener("click", this.closeNotes.bind(this));
        this.dragItem.addEventListener("mousedown", this.dragStart.bind(this));
        this.dragItem.addEventListener("mouseup", this.dragEnd.bind(this));
        this.dragItem.addEventListener("mousemove", this.drag.bind(this));
        this.dragItem.addEventListener("mouseleave", this.onMouseLeave.bind(this));

        this.saveBtn.addEventListener("click", this.saveNotes.bind(this));
        this.displayNotes()
    }
    positionNotes(){
        this.xOffset = 0;
        this.yOffset = 0;
        this.dragElement.style.transform = `translate3d(${0}px, ${0}px, 0)`;
    }
    openNotes() {
        this.dragElement.classList.add('notes-container--active')
        this.notesBtn.classList.add('notes-btn--active')
    }

    closeNotes() {
        this.notesBtn.classList.remove('notes-btn--active')
        this.dragElement.classList.remove('notes-container--active')
        this.positionNotes()
    }

    dragStart(e) {
        this.initialX = e.clientX - this.xOffset;
        this.initialY = e.clientY - this.yOffset;
        if (e.target === this.dragItem) {
            this.active = true;
            this.dragItem.classList.add('top-bar--active')
        }

    }

    dragEnd() {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.dragItem.classList.remove('top-bar--active')
        this.active = false;
    }

    drag(e) {
        if (this.active && innerWidth > 648) {
            e.preventDefault();
            this.currentX = e.clientX - this.initialX;
            this.currentY = e.clientY - this.initialY;
            this.xOffset = this.currentX;
            this.yOffset = this.currentY;
       
            
            // const containerSize = parseInt(window.getComputedStyle(this.container).width)
            // const dragElementSize = parseInt(window.getComputedStyle(this.dragElement).width)
            
            // // const containerSize = this.container.clientWidth
            // // const dragElementSize = this.dragElement.clientWidth

            // let left = this.container.getBoundingClientRect().left
            // let leftEl = this.dragElement.getBoundingClientRect().left

            // let posX = e.clientX - this.container.getBoundingClientRect().left
            // let posY = e.clientY - this.container.getBoundingClientRect().top
            
            // console.log(leftEl)
            // if(this.currentX < -80){
            //     this.currentX -= -80
            // }
            this.setTranslate(this.currentX, this.currentY, this.dragElement);
        }
        
    }

    onMouseLeave() {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.active = false;
    }

    setTranslate(xPos, yPos, dragElement) {
        dragElement.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
    displayNotes() {
        if(this.storedTxt){
            this.textarea.textContent = this.storedTxt
        }
    }
    saveNotes() {
        localStorage.setItem('notesTxt', this.textarea.value)
    }
}
