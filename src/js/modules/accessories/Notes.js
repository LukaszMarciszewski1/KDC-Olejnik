export class Notes {
    constructor() {
        this.dragItem = document.querySelector('.top-bar');
        this.dragElement = document.querySelector('.notes-container')
        // this.container = document.querySelector('.calculator')
        this.notesBtn = document.querySelector('.notes-btn')

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

    }

    openNotes() {
        this.dragElement.classList.add('notes-container--active')
    }

    closeNotes() {
        this.dragElement.classList.remove('notes-container--active')
    }

    dragStart(e) {
        this.initialX = e.clientX - this.xOffset;
        this.initialY = e.clientY - this.yOffset;
        if (e.target === this.dragItem) {
            this.active = true;
        }
    }

    dragEnd() {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.active = false;
    }

    drag(e) {
        if (this.active) {
            e.preventDefault();
            this.currentX = e.clientX - this.initialX;
            this.currentY = e.clientY - this.initialY;
            this.xOffset = this.currentX;
            this.yOffset = this.currentY;
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
}