// class ItemData {
//     constructor(nameCompany, nrPhone, email, www) {
//         this.nameCompany = nameCompany;
//         this.nrPhone = nrPhone;
//         this.email = email;
//         this.www = www;
//     }
// }
const itemData = {
    nameCompany: null,
    nrPhone: null,
    email: null,
    www: null,
}

export class Suppliers {
    constructor() {
        //button operation
        this.suppliersBtnClose = document.querySelector('.suppliers-close');
        this.suppliersBtnOpen = document.querySelector('.suppliers-btn');
        this.suppliersContainer = document.querySelector('.suppliers-container');
        this.suppliersBtnOpen.addEventListener('click', this.openSuppliers.bind(this));
        this.suppliersBtnClose.addEventListener('click', this.closeSuppliers.bind(this));

        //arrays
        this.containerList = document.querySelector('.suppliers-list-container');
        this.itemsList = [];
        this.storeItems = this.storeGetItem()

        //display items from local storage
        this.displayItems()
        // Add item to list
        document.querySelector('#suppliers-form-to-do').addEventListener('submit', (e) => {
            const nameCompany = document.getElementById('name-company').value;
            const nrPhone = document.getElementById('nr-phone').value;
            const email = document.getElementById('email').value;
            const www = document.getElementById('www-address').value;
            const item = {nameCompany, nrPhone, email, www}
            e.preventDefault();
            localStorage.clear()
            this.addItemToList(item)
            this.storeAddItem(item)
        });

    }
    openSuppliers() {
        this.suppliersContainer.classList.add('suppliers-container--active')
        this.suppliersBtnOpen.classList.add('suppliers-btn--active')

    }
    closeSuppliers() {
        this.suppliersContainer.classList.remove('suppliers-container--active')
        this.suppliersBtnOpen.classList.remove('suppliers-btn--active')
    }
    //-------------------------------->
    displayItems() {
        this.storeItems.forEach(item => this.addItemToList(item))
        console.log(this.storeItems)
    }

    //add item to list
    addItemToList(item) {
        if (item) {
            const containerList = this.containerList
            const row = document.createElement('div');
            row.className = 'suppliers-items';
            row.innerHTML = `
                        <div class="suppliers-item"><p>${item.nameCompany}</p></div>
                        <div class="suppliers-item"><p>${item.nrPhone}</p></div>
                        <div class="suppliers-item suppliers-item-link"><p>${item.email}</p></div>
                        <div class="suppliers-item suppliers-item-link"><p>${item.www}</p></div>
                        <button class="delete-item"><ion-icon name="trash-outline"></ion-icon></button>
                       `;


            this.itemsList.push(row);
            // this.renderList();
            this.containerList.appendChild(row);
            // this.clearFields();
        }
    }

    //localStorage array
    storeGetItem() {
        let storeItems;
        if (localStorage.getItem('storeItems') === null) {
            storeItems = []
        } else {
            storeItems = JSON.parse(localStorage.getItem('storeItems'))
        }
        console.log(storeItems)
        return storeItems
    }

    //add item to localStorage
    storeAddItem(item) {
        if (item) {
            this.storeItems.push(item);
            localStorage.setItem('storeItems', JSON.stringify(this.storeItems))
        }
        console.log(this.storeItems)
    }
}

// if (localStorage.getItem("textareaValue") !== null) {
//     textarea.value = localStorage.getItem("textareaValue");
// }