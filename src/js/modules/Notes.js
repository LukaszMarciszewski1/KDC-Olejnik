export class Notes {
    constructor() {
        this.container = document.querySelector('.calculator')
        this.closeBtn = document.querySelector('.close-notes')
        this.container = document.querySelector('.notes-container')
        this.openBtn = document.querySelector('.notes-btn')
        this.textarea = document.querySelector('.notes-textarea')
        this.saveBtn = document.querySelector('.save-notes')
        this.deleteBtn = document.querySelector('.delete-notes')
        this.storedTxt = localStorage.getItem('notesTxt')

        this.openBtn.addEventListener("click", this.openNotes.bind(this));
        this.closeBtn.addEventListener("click", this.closeNotes.bind(this));
        this.saveBtn.addEventListener("click", this.saveNotes.bind(this));
        this.deleteBtn.addEventListener("click", this.deleteNotes.bind(this));
        this.displayNotes()
    }
    //open notes
    openNotes() {
        this.container.classList.add('notes-container--active')
        this.openBtn.classList.add('notes-btn--active')

    }
    //close notes
    closeNotes() {
        this.container.classList.remove('notes-container--active')
        this.openBtn.classList.remove('notes-btn--active')
    }

    //display notes
    displayNotes() {
        if (this.storedTxt) {
            this.textarea.textContent = this.storedTxt
        }
    }

    //save notes to localStorage
    saveNotes() {
        localStorage.setItem('notesTxt', this.textarea.value)
    }

    //remove item from list
    deleteNotes() {
        this.textarea.textContent = ''
        localStorage.removeItem('notesTxt')
    }
}