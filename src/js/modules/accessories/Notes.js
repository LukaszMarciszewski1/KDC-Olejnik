export class Notes {
    constructor() {
        this.container = document.querySelector('.calculator')
        this.notesBtnClose = document.querySelector('.close-notes')
        this.container = document.querySelector('.notes-container')
        this.notesBtnOpen = document.querySelector('.notes-btn')
        this.textarea = document.querySelector('.notes-textarea')
        this.saveBtn = document.querySelector('.save-notes')
        this.storedTxt = localStorage.getItem('notesTxt')
        
        this.notesBtnOpen.addEventListener("click", this.openNotes.bind(this));
        this.notesBtnClose.addEventListener("click", this.closeNotes.bind(this));
        this.saveBtn.addEventListener("click", this.saveNotes.bind(this));
        this.displayNotes()
    }

    openNotes(){
        this.container.classList.add('notes-container--active')
        // this.notesBtn.classList.add('notes-btn--active')
        
    }
    closeNotes(){
        this.container.classList.remove('notes-container--active')
        // this.notesBtn.classList.remove('notes-btn--active')
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
